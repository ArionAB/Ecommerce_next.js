using Ecommerce.DataLayer.Utils;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class ProductDTO
    {
        public Guid ProductId { get; set; }

     

        public int Price { get; set; }

        public string Description { get; set; }
        
        public string Title { get; set; }

        public ProductCategoryType ProductCategory { get; set; }

        public SubcategoryType SubcategoryType { get; set; }


        public int TotalCategoryItems { get; set; }

        public int TotalSize { get; set; }

        public List<ProductSizeDTO> ProductSizes  { get; set; }
        public List<ProductPictureDTO> ProductPictures { get; set; }

        



    }
}
