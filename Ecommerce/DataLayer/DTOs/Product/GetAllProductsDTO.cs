using Ecommerce.DataLayer.DTOs.Product;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class GetAllProductsDTO
    {
        public List<ProductDTO> ProductItems { get; set; }

      

        public ProductPriceDTO PriceRange { get; set; }

        public int TotalSearchResultItems { get; set; }

        public int TotalItems { get; set; }


    }
}
