using Ecommerce.DataLayer.DTOs.Cart;
using Ecommerce.DataLayer.Utils;
using System;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.CartService
{
    public class CartServiceInterface
    {

       public interface ICartService
        {
            Task<ServiceResponse<Object>> AddToCart(AddItemToCartDTO itemDto);
        }
    }
}
