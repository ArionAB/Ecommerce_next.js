using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.DTOs.Cart;
using Ecommerce.DataLayer.Models.Cart;
using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.CartService
{
    public class CartServiceInterface
    {

       public interface ICartService
        {
            Task<ServiceResponse<Object>> AddToCart(AddItemToCartDTO itemDto, Guid loggedInUserId, Guid CartId);
            
            Task<ServiceResponse<List<ProductDTO>>> GetCartItems(Guid loggedInUserId);

            Task<ServiceResponse<Object>> ChangeQuantity(ChangeQuantityDTO changeQuantityDTO, Guid loggedInUserId);

            Task<ServiceResponse<Object>> RemoveItem(RemoveItemDTO removeItemDTO, Guid loggedInUserId, Guid CartId);

            Task<ServiceResponse<Object>> RemoveAllItems(Guid loggedInUserId, Guid CartId);

            Task<ServiceResponse<GetAbandonedCartsDTO>> GetAbandonedCarts(AbandonedCartsFiltersDTO filters);

            Task<ServiceResponse<Object>> SendAbandonedCartEmail(string userId);
        }
    }
}
