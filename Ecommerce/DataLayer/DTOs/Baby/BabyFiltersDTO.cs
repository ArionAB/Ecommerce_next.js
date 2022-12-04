using Ecommerce.DataLayer.Utils;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class BabyFiltersDTO
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public List<int> BabySize { get; set; }

        //public int BabySize { get; set; }

        public int MinPrice { get; set; }

        public int MaxPrice { get; set; }

        public CategoryType Category { get; set; }
     

    }
}
