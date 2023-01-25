﻿using AutoMapper;
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

namespace Ecommerce.ServiceLayer.CartService
{
    public class CartService : ICartService
    {

        private readonly MainDbContext _context;
        private readonly IMapper _mapper;
       

        public CartService(MainDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
         
        }

        public async Task<ServiceResponse<Object>> AddToCart(AddItemToCartDTO itemDTO, Guid loggedInUserId, Guid CartId)
        {
            try
            {
                if (GenericFunctions.GuidIsNullOrEmpty(itemDTO.ProductId))
                {
                    return new ServiceResponse<object> { Response = null, Success = false, Message = Messages.Message_ProductIdError };
                }
                var newCartItem = new CartProduct
                {
                    CartProductId = Guid.NewGuid(),
                    CartId = CartId,
                    ProductId = itemDTO.ProductId,
                    SizeType = itemDTO.SizeType,
                    Quantity = itemDTO.Quantity,
                    UserId = loggedInUserId
                    
                };
                var carts = _mapper.Map<CartProduct>(newCartItem);
                var cartexists = await _context.Cart.FirstOrDefaultAsync(x => x.UserId == loggedInUserId);
                switch(cartexists == null)
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
                        var itemExists = await _context.CartProducts.FirstOrDefaultAsync(x => x.CartId == CartId && x.ProductId == itemDTO.ProductId && x.SizeType == itemDTO.SizeType);

                        if (itemExists != null)
                        {
                            itemExists.Quantity += itemDTO.Quantity;
                            //itemExists.TotalPrice += itemDTO.TotalPrice;

                            await _context.SaveChangesAsync();

                            return new ServiceResponse<Object> { Response = null, Success = true, Message = Messages.Message_ChangedItemQtySuccess };

                        }
                        else
                        {
                 
                            await _context.CartProducts.AddAsync(carts);

                            _context.SaveChanges();

                            return new ServiceResponse<Object> { Response = null, Success = true, Message = Messages.Message_AddItemToCartSuccess };
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

    }
}
