﻿using Ecommerce.DataLayer.DTOs.Cart;
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



    }
}
