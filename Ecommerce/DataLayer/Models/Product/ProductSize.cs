using System;

namespace Ecommerce.DataLayer.Models.Baby
{
    public class ProductSize
    {
        public Guid ProductSizeId { get; set; }

        public Guid ProductId { get; set; }

        public ProductClass Product { get; set; }

        public string Size { get; set; }

        public int Quantity { get; set; }
    }
}
