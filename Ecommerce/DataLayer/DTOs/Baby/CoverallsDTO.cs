using Ecommerce.DataLayer.Utils;
using System;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class CoverallsDTO
    {
        public Guid ConverallsId { get; set; }

        public CoverallsSizeType CoverallsSizeType { get; set; }

        public int Price { get; set; }

        public string Description { get; set; }

        public string Title { get; set; }

        public CategoryType CategoryType { get; set; }
    }
}
