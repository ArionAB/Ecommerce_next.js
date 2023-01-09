using Ecommerce.DataLayer.Utils;
using System;

namespace Ecommerce.DataLayer.DTOs.Cart
{
    public class AddItemToCartDTO
    {
        public Guid ProductId { get; set; }
            
        public Guid UserId { get; set; }

        public SizeType SizeType { get; set; }
    }
}
