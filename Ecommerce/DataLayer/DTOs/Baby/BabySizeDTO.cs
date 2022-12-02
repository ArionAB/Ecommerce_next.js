using System;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class BabySizeDTO
    {
        public Guid BabySizeId { get; set; }

        public string Size { get; set; }
        
        public int Quantity { get; set; }
    }
}
