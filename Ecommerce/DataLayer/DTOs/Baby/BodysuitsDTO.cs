using Ecommerce.DataLayer.Utils;
using Microsoft.AspNetCore.Http;
using System;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class BodysuitsDTO
    {
        public Guid BodysuitsId { get; set; }

        public BodysuitsSizeType BodySuitsSizeType { get; set; }

        public int Price { get; set; }

        public string Description { get; set; }

        public string Title { get; set; }

      

        
    }
}
