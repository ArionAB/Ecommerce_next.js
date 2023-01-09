using AutoMapper;
using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.DTOs.Cart;
using Ecommerce.DataLayer.Models.Cart;
using Ecommerce.DataLayer.Utils;
using Ecommerce.ServiceLayer.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using static Ecommerce.ServiceLayer.CartService.CartServiceInterface;

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

        public async Task<ServiceResponse<Object>> AddToCart(AddItemToCartDTO itemDTO)
        {
            try
            {
                if (GenericFunctions.GuidIsNullOrEmpty(itemDTO.ProductId))
                {
                    return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_GetBabyItemIdError };
                }

                var cartAlreadyExists = await _context.Cart.AnyAsync(x => x.UserId == itemDTO.UserId);
                CartClass cart = await _context.Cart.FirstOrDefaultAsync(x => x.UserId == itemDTO.UserId);
                if (!cartAlreadyExists)
                {
                    cart = new CartClass();
                    cart.UserId = itemDTO.UserId;
                    cart.CartId = Guid.NewGuid();
                    cart.DateCreated = GenericFunctions.GetCurrentDateTime();
                    cart.DateModified = GenericFunctions.GetCurrentDateTime();
            
                    _context.Cart.Add(cart);
                }

                //if (cart == null) {

                //_context.SaveChanges();


                //}
                //else
                //{
                //    cart.CartProducts.Add(new CartProduct { CartId = cart.CartId, ProductId = itemDTO.ProductId });
                //}




                //var product = _mapper.Map<CartProduct>(itemDTO);
                //var product = _context.CartProducts;
                //var product = new AddItemToCartDTO();
                //product.ProductId = itemDTO.ProductId;
                //product.UserId = itemDTO.UserId;
                //product.SizeType = (SizeType)1;
                //var cart = _context.Cart

                //await _context.CartProducts.AddAsync(product);
                _context.CartProducts.Add(new CartProduct { CartId = cart.CartId, ProductId = itemDTO.ProductId, SizeType = itemDTO.SizeType });

                //if (product == null )
                //{
                //    return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_AddItemToCartError };
                //}

                _context.SaveChanges();

                return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_AddItemToCartSuccess };


            } catch(Exception e)
            {
                return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_AddItemToCartError };
            }
            
        }

    }
}
