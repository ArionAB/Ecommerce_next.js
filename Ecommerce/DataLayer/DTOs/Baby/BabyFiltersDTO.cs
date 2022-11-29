using Ecommerce.DataLayer.Utils;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class BabyFiltersDTO
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public BabySizeType BabySize { get; set; }

        public int MinPrice { get; set; }

        public int MaxPrice { get; set; }

        public CategoryType Category { get; set; }
     

    }
}
