using Ecommerce.DataLayer.DTOs.Cart;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using static Ecommerce.ServiceLayer.CartService.CartServiceInterface;

namespace Ecommerce.Controllers
{
    public class CartController : Controller
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost("/Cart/Add")]
        public async Task<IActionResult> AddToCart([FromForm] AddItemToCartDTO itemDTO)
        {
            var response = await _cartService.AddToCart(itemDTO);
            if (response.Success) return Ok(response);

            else return BadRequest(response);
        }
       
    }
}
