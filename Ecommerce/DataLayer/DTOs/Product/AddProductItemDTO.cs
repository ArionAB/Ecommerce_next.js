using Ecommerce.DataLayer.Utils;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class AddProductItemDTO
    {
      
        public int PriceKg { get; set; }

        public int PriceHalf { get; set; }
        
        public string Description { get; set; }
        
        public string Title { get; set; }

        public List<IFormFile> Pictures { get; set; }

        public FruitType FruitType  { get; set; }
        
        public ProductCategoryType ProductCategory { get; set; }

        public bool InStock { get; set; }

    

        
    }
}
