using Ecommerce.DataLayer.Utils;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class ProductDTO
    {
        public Guid ProductId { get; set; }

        public Guid CartProductId { get; set; }
        public int PriceKg { get; set; }

        public int PriceHalf { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public ProductCategoryType ProductCategory { get; set; }
        public FruitType FruitType { get; set; }
        public int TotalCategoryItems { get; set; }
        public List<ProductPictureDTO> ProductPictures { get; set; }

        public SizeType SizeType { get; set; }
        
        public int Quantity { get; set; }
     


        





    

        



    }
}
