using Ecommerce.DataLayer.Utils;
using System;

namespace Ecommerce.DataLayer.DTOs.Cart
{
    public class CartItemDTO
    {
        public Guid ProductId { get; set; }

        public Guid CartId { get; set; }

        public SizeType SizeType { get; set; }

        public int Quantity { get; set; }
    }
}
