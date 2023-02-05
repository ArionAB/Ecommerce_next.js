using Ecommerce.DataLayer.Utils;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class UpdateProductItemDTO
    {
        public Guid ProductId { get; set; }

        public int PriceKg { get; set; }

        public string PriceHalf { get; set; }

        public string Description { get; set; }

        public string Title { get; set; }

        public FruitType FruitType { get; set; }

        public ProductCategoryType ProductCategory { get; set; }

        public List<IFormFile> NewAdditionalPictures { get; set; }

        public List<Guid> DeletedAdditionalPictures { get; set; }

       


    }
}
