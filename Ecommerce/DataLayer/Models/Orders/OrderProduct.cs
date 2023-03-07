using Ecommerce.DataLayer.Models.Baby;
using Ecommerce.DataLayer.Utils;
using System;

namespace Ecommerce.DataLayer.Models.Orders
{
    public class OrderProduct
    {
        public Guid OrderProductId { get; set; }

        public Guid OrderId { get; set; }

        public virtual Order Order { get; set; }

        public Guid ProductId { get; set; }

        public Guid UserId { get; set; }

        public string FilePath { get; set; }

        public ProductPicture ProductPicture { get; set; }

        public ProductClass Product { get; set; }

        public string Title { get; set; }
        
        public int Price { get; set; }

        public SizeType SizeType { get; set; }

        public FruitType FruitType { get; set; }

        public ProductCategoryType ProductCategory { get; set; }

        public int Quantity { get; set; }

   
        
            
    }
}
