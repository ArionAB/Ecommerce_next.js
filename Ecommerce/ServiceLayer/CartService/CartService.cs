using AutoMapper;
using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.DTOs.Cart;
using Ecommerce.DataLayer.Models.Cart;
using Ecommerce.DataLayer.Utils;
using Ecommerce.ServiceLayer.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using static Ecommerce.ServiceLayer.CartService.CartServiceInterface;
using Ecommerce.DataLayer.Models.User;
using Ecommerce.ServiceLayer.EmailService;

namespace Ecommerce.ServiceLayer.CartService
{
    public class CartService : ICartService
    {

        private readonly MainDbContext _context;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

       

        public CartService(MainDbContext context, IMapper mapper, IEmailService emailService)
        {
            _context = context;
            _mapper = mapper;
            _emailService = emailService;
         
        }

        public async Task<ServiceResponse<Object>> AddToCart(AddItemToCartDTO items, Guid loggedInUserId, Guid CartId)
        {
            try
            {
                foreach(var item in items.CartItems)
                {
                    if (GenericFunctions.GuidIsNullOrEmpty(item.ProductId))
                    {
                        return new ServiceResponse<object> { Response = null, Success = false, Message = Messages.Message_ProductIdError };
                    }
                    var newCartItem = new CartProduct
                    {
                        CartProductId = Guid.NewGuid(),
                        CartId = CartId,
                        ProductId = item.ProductId,
                        SizeType = item.SizeType,
                        Quantity = item.Quantity,
                        UserId = loggedInUserId,
                        MixedFruitId = item.MixedFruitId



                    };
                    var carts = _mapper.Map<CartProduct>(newCartItem);
                    var cartexists = await _context.Cart.FirstOrDefaultAsync(x => x.UserId == loggedInUserId);
                    switch (cartexists == null)
                    {
                        case true:
                            var cart = new CartClass
                            {
                                UserId = loggedInUserId,
                                DateCreated = DateTime.Now,
                                DateModified = DateTime.Now,
                                CartId = CartId

                            };

                            await _context.Cart.AddAsync(cart);


                            await _context.CartProducts.AddAsync(carts);
                            await _context.SaveChangesAsync();

                            break;
                        case false:
                            var itemExists = await _context.CartProducts.FirstOrDefaultAsync(x => x.CartId == CartId && x.ProductId == item.ProductId && x.SizeType == item.SizeType && x.MixedFruitId == item.MixedFruitId);

                            if (itemExists != null)
                            {
                                itemExists.Quantity += item.Quantity;
                                //itemExists.TotalPrice += itemDTO.TotalPrice;

                                await _context.SaveChangesAsync();

                                //this return breaks the for loop 
                                //return new ServiceResponse<Object> { Response = null, Success = true, Message = Messages.Message_ChangedItemQtySuccess };

                            }
                            else
                            {

                                await _context.CartProducts.AddAsync(carts);

                                _context.SaveChanges();

                              
                            }
                            break;


                    }

                }
                
               

                return new ServiceResponse<Object> { Response = null, Success = true, Message = Messages.Message_AddItemToCartSuccess };

            }
            catch (Exception e)
            {
                return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_AddItemToCartError };
            }
         

        }

              


        
        public async Task<ServiceResponse<List<ProductDTO>>> GetCartItems(Guid userId)
        {
            try
            {
                if (GenericFunctions.GuidIsNullOrEmpty(userId))
                {
                    return new ServiceResponse<List<ProductDTO>> { Response = null, Success = false, Message = Messages.Message_GetCartItemIdError };
                }

                var cart = await _context.Cart.FirstOrDefaultAsync(x => x.UserId == userId);
                cart.CartProducts = await _context.CartProducts.Where(x => x.CartId == cart.CartId).ToListAsync();

                if (cart == null)
                {
                    return new ServiceResponse<List<ProductDTO>> { Response = null, Success = false, Message = Messages.Message_GetCartItemCartError };
                }

                var cartItems = new List<ProductDTO>();
    

                foreach (var item in cart.CartProducts)
                {
                    var product = await _context.Product.FirstOrDefaultAsync(x => x.ProductId == item.ProductId);
                    product.ProductPictures = await _context.ProductPictures.Where(x => x.ProductId == item.ProductId).ToListAsync();
              
                    if (product == null)
                    {
                        return new ServiceResponse<List<ProductDTO>> { Response = null, Success = false, Message = Messages.Message_GetCartItemProductError };
                    }

                    var productDTO = _mapper.Map<ProductDTO>(product);
                    productDTO.SizeType = item.SizeType;
                    productDTO.Quantity = item.Quantity;
                    productDTO.CartProductId = item.CartProductId;


                    if (!string.IsNullOrEmpty(item.MixedFruitId))
                    {
                        int[] arr = item.MixedFruitId.Split(",").Select(str =>
                        {
                            int value;
                            if (int.TryParse(str, out value))
                            {
                                return value;
                            }
                            return 0; // or return null;
                        }).ToArray();
                        productDTO.MixedFruitId = arr;
                    }
                    else
                    {
                        productDTO.MixedFruitId = null;
                    }




                    cartItems.Add(productDTO);
                
                }

                if (cartItems == null)
                {
                    return new ServiceResponse<List<ProductDTO>> { Response = null, Success = false, Message = Messages.Message_GetCartItemCartError };
                }


                return new ServiceResponse<List<ProductDTO>> { Response = cartItems, Success = true, Message = Messages.Message_GetCartItemsSuccess };



             
            }
            catch (Exception e)
            {
                return new ServiceResponse<List<ProductDTO>> { Response = null, Success = false, Message = Messages.Message_GetCartItemError };
            }
        }

        public async Task<ServiceResponse<Object>> ChangeQuantity(ChangeQuantityDTO quantityDTO, Guid loggedInUserId)
        {
            try
            {
                if (GenericFunctions.GuidIsNullOrEmpty(quantityDTO.CartProductId))
                {
                    return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_ProductIdError };
                }



                var cartItem = _context.CartProducts.FirstOrDefault(x => x.UserId == loggedInUserId && x.CartProductId == quantityDTO.CartProductId);

                if (cartItem == null)
                {
                    return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_GetCartItemProductError };
                }

                cartItem.Quantity = quantityDTO.Quantity;

                await _context.SaveChangesAsync();

                return new ServiceResponse<Object> { Response = cartItem, Success = true, Message = Messages.Message_ChangedItemQtySuccess };

            }
            catch (Exception e)
            {
                return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_ChangeItemQtyError };
            }
         
        }

        public async Task<ServiceResponse<Object>> RemoveItem(RemoveItemDTO removeItemDTO, Guid loggedInUserId, Guid CartId)
        {
            try
            {
                if (GenericFunctions.GuidIsNullOrEmpty(removeItemDTO.ProductId))
                {
                    return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_ProductIdError };
                }

                var cartItem = _context.CartProducts.FirstOrDefault(x => x.CartProductId == removeItemDTO.ProductId && x.SizeType == removeItemDTO.SizeType);

                if (cartItem == null)
                {
                    return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_GetCartItemProductError };
                }

                _context.CartProducts.Remove(cartItem);

                await _context.SaveChangesAsync();

                return new ServiceResponse<Object> { Response = cartItem, Success = true, Message = Messages.Message_RemoveCartItemSuccess };

            }
            catch (Exception e)
            {
                return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_RemoveCartItemError };
            }
        }

        public async Task<ServiceResponse<Object>> RemoveAllItems(Guid userId, Guid CartId)
        {
            try
            {
                if (GenericFunctions.GuidIsNullOrEmpty(userId))
                {
                    return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_GetCartItemIdError };
                }

                var cart = await _context.Cart.FirstOrDefaultAsync(x => x.CartId == CartId);

                if (cart == null)
                {
                    return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_GetCartItemCartError };
                }

                var cartItems = await _context.CartProducts.Where(x => x.CartId == cart.CartId).ToListAsync();

                if (cartItems == null)
                {
                    return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_GetCartItemCartError };
                }

                _context.CartProducts.RemoveRange(cartItems);
                _context.Cart.Remove(cart);

                await _context.SaveChangesAsync();

                return new ServiceResponse<Object> { Response = null, Success = true, Message = Messages.Message_RemoveAllCartItemsSuccess };

            }
            catch (Exception e)
            {
                return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_RemoveAllCartItemsError };
            }
        
        }

  

        public async Task<ServiceResponse<GetAbandonedCartsDTO>> GetAbandonedCarts(AbandonedCartsFiltersDTO filters)
        {
            try
            {
                DateTime threshold = DateTime.Now.AddDays(-3);

                var totalCarts =  _context.Cart.Where(x => x.DateModified < threshold).Count();
                var abandonedCarts = await _context.Cart.Where(x => x.DateModified < threshold).Skip(filters.PageNumber * filters.PageSize).Take(filters.PageSize).ToListAsync();
                var numberOfPages = totalCarts / filters.PageSize;
                
           

                var carts = new GetAbandonedCartsDTO()
                {
                    AbandonedCarts = abandonedCarts,
                     Count = totalCarts,
                     TotalPages = numberOfPages
                };
             

                return new ServiceResponse<GetAbandonedCartsDTO> { Response = carts, Success = true, Message = Messages.Message_GetAbandonedCartsSuccess };


            } catch (Exception e)
            {
                return new ServiceResponse<GetAbandonedCartsDTO> { Response = null, Success = false, Message = Messages.Message_GetAbandonedCartsError };
            }
          


        }

        public async Task<ServiceResponse<Object>> SendAbandonedCartEmail(string userId)
        {
            try
           
            {
                var account = await _context.Users.SingleOrDefaultAsync(x => x.UserId.ToString() == userId);
                // always return ok response to prevent email enumeration
                if (account == null) return new ServiceResponse<Object> { Response = (string)null, Success = false }; ;

                var cart = await _context.Cart.SingleOrDefaultAsync(x => x.UserId.ToString() == userId);
                cart.NumberEmailsSent += 1;
                cart.DateEmailSent = DateTime.Now;

                _context.Cart.Update(cart);
                _context.SaveChanges();


                _emailService.SendAbandonedCartEmail(account);

                return new ServiceResponse<Object> { Response = (string)null, Success = true, Message = Messages.Message_ForgottenPasswordEmailSent };

            } catch (Exception e)
            {
                return new ServiceResponse<Object> { Response = (string)null, Success = true, Message = Messages.Message_ForgottenPasswordEmailNotSent };
            }
           
        }

       

    }
}
