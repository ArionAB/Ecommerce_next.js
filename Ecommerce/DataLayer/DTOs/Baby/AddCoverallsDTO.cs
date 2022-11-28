﻿using Ecommerce.DataLayer.Utils;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class AddCoverallsDTO
    {
          
        public int Price { get; set; }

        public CoverallsSizeType CoverallsSizeType { get; set; }

        public string Description { get; set; }
        
        public string Title { get; set; }

        public List<IFormFile> Pictures { get; set; }

        public CategoryType CategoryType { get; set; }
    }
}

