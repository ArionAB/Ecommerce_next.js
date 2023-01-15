using Ecommerce.DataLayer.Utils;
using System;

namespace Ecommerce.DataLayer.DTOs.Cart
{
    public class ChangeQuantityDTO
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public SizeType SizeType { get; set; }


        
    }
}
