using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class PaginatedBabyItemsDTO
    {
        public List<BabyDTO> BabyItems { get; set; }

        public int TotalPages { get; set; }
        
        public int CurrentPageNumber { get; set; }
        
    }
}
