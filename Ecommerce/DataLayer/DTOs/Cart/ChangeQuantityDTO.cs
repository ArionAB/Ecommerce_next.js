using Ecommerce.DataLayer.Utils;
using System;

namespace Ecommerce.DataLayer.DTOs.Cart
{
    public class ChangeQuantityDTO
    {
        public Guid CartProductId { get; set; }
        public int Quantity { get; set; }
     


        
    }
}
