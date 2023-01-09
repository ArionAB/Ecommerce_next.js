using Ecommerce.DataLayer.Utils;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class AddProductItemDTO
    {
      
        public int Price { get; set; }

        //public List<ProductSizeDTO> ProductSize { get; set; }
        
        public string Description { get; set; }
        
        public string Title { get; set; }

        public List<IFormFile> Pictures { get; set; }

        public FruitType FruitType  { get; set; }
        
        public ProductCategoryType ProductCategory { get; set; }

        
    }
}
