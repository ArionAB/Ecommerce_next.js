using System;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class ProductSizeDTO
    {
        public Guid ProductSizeId { get; set; }

        public string Size { get; set; }
        
        public int Quantity { get; set; }
    }
}
