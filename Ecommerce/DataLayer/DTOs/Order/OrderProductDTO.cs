using Ecommerce.DataLayer.Models.Baby;
using Ecommerce.DataLayer.Utils;
using System;
using System.Collections;

namespace Ecommerce.DataLayer.DTOs.Order
{
    public class OrderProductDTO
    {
        public Guid OrderProductId { get; set; }

        public Guid ProductId { get; set; }
        public string FilePath { get; set; }
      
        public string Title { get; set; }
        public int Price { get; set; }
        public SizeType SizeType { get; set; }

        public FruitType FruitType { get; set; }

        public ProductCategoryType ProductCategory { get; set; }

        public int Quantity { get; set; }

        public string MixedFruitId { get; set; }

    }
}
       
        
    






     
        
       

