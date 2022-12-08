using Ecommerce.DataLayer.Utils;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class ProductFiltersDTO
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public List<string> ProductSize { get; set; }

        public string SearchText { get; set; }

        public int MinPrice { get; set; }

        public int MaxPrice { get; set; }

        public ProductCategoryType ProductCategory { get; set; }

        public SubcategoryType SubcategoryType { get; set; }
     

    }
}
