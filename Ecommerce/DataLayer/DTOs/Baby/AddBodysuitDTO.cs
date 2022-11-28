using Ecommerce.DataLayer.Utils;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class AddBodysuitDTO
    {
        public int Price { get; set; }

        public BodysuitsSizeType BodysuitsSizeType { get; set; }

        public string Description { get; set; }
        
        public string Title { get; set; }

        public List<IFormFile> Pictures { get; set; }

        public CategoryType CategoryType  { get; set; }
    }
}
