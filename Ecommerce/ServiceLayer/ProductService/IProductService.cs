using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.BabyService
{
    public interface IProductService
    {
        Task<ServiceResponse<Object>> AddProductItem(AddProductItemDTO productDTO);

        Task<ServiceResponse<GetAllProductsDTO>> GetProductItems(string SearchText);
        
        Task<ServiceResponse<ProductDTO>> GetProductItem(Guid id);

        Task<ServiceResponse<ProductDTO>> UpdateProductItem(UpdateProductItemDTO productDTO);

        Task<ServiceResponse<PaginatedProductItemsDTO>> GetPaginatedProductItems(ProductFiltersDTO filters);

        Task<ServiceResponse<Object>> DeleteProduct(Guid id);




    }
}
