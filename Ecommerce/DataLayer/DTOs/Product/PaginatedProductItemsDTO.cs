using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class PaginatedProductItemsDTO
    {
        public List<ProductDTO> ProductItems { get; set; }

        public int TotalPages { get; set; }
        
        public int CurrentPageNumber { get; set; }

        public int TotalItems { get; set; }
        
    }
}
