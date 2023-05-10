using Ecommerce.DataLayer.DTOs.Cart;
using Ecommerce.DataLayer.Utils;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using static Ecommerce.ServiceLayer.CartService.CartServiceInterface;

namespace Ecommerce.Controllers
{
    public class CartController : BaseController
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost("/Cart/Add")]
        public async Task<IActionResult> AddToCart([FromForm] AddItemToCartDTO itemDTO)
        {
            
            var response = await _cartService.AddToCart(itemDTO, Account.UserId, Account.CartId);
            if (response.Success) return Ok(response);

            else return BadRequest(response);
        }

        [HttpGet ("/Cart/GetCartItems")]

        public async Task<IActionResult> GetCartItems()
          
        {
            var response = await _cartService.GetCartItems(Account.UserId);
            if (response.Success) return Ok(response);

            else return BadRequest(response);
        }

        [HttpPost("/Cart/ChangeQuantity")]

        public async Task<IActionResult> ChangeQuantity([FromForm] ChangeQuantityDTO changeQuantityDTO)
        {
            var response = await _cartService.ChangeQuantity(changeQuantityDTO, Account.UserId);
            if (response.Success) return Ok(response);

            else return BadRequest(response);
        }

        [HttpPost("/Cart/RemoveItem")]

        public async Task<IActionResult> RemoveItem([FromForm] RemoveItemDTO removeItemDTO)
        {
            var response = await _cartService.RemoveItem(removeItemDTO, Account.UserId, Account.CartId);
            if (response.Success) return Ok(response);

            else return BadRequest(response);

        }

        [HttpGet("/Cart/RemoveAllItems")]

        public async Task<IActionResult> RemoveAllItems()
        {
            var response = await _cartService.RemoveAllItems(Account.UserId, Account.CartId);
            if (response.Success) return Ok(response);

            else return BadRequest(response);

        }
        //[Authorize(UserType.Admin)]
        [HttpPost("/Cart/GetAbandonedCarts")]

        public async Task<IActionResult> GetAbandonedCarts([FromForm] AbandonedCartsFiltersDTO filters)
        {
            var response = await _cartService.GetAbandonedCarts(filters);
            if (response.Success) return Ok(response);

            else return BadRequest(response);
        }

        //[Authorize(UserType.Admin)]
        [HttpPost("/Cart/SendAbandonedCartEmail")]

        public async Task<IActionResult> SendAbandonedCartEmail([FromForm] string userId)
        {
            var response = await _cartService.SendAbandonedCartEmail(userId);
            if (response.Success) return Ok(response);

            else return BadRequest(response);
        }


    }
}
