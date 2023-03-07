using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Cart
{
    public class AddItemToCartDTO
    {
        public List<CartItemDTO> CartItems { get; set; }
    }
}
