using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.ServiceLayer.BabyService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Ecommerce.Controllers
{
    [ApiController]
    public class ProductsController : BaseController
    {

        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("/Product/Add")]
        
        public async Task<IActionResult> AddBabyItem([FromForm] AddProductItemDTO babyitemDTO)
        {
            var response = await _productService.AddProductItem(babyitemDTO);
            if (response.Success) return Ok(response);

            else return BadRequest(response);
        }

        [HttpPost("/Product/GetItems")]
        
        public async Task<IActionResult> GetProductItems([FromForm] string SearchText)
        {
            var result = await _productService.GetProductItems(SearchText);
            if (result.Success) return Ok(result);

            else return BadRequest(result);
        }

        [HttpGet("/Product/GetItem")]

        public async Task<IActionResult> GetProductItem([FromQuery] Guid id)
        {
            var result = await _productService.GetProductItem(id);
            if (result.Success) return Ok(result);

            else return BadRequest(result);
        }

        [HttpPost("/Product/Update")]
        
        public async Task<IActionResult> UpdateProductItem([FromForm]UpdateProductItemDTO babyitemDTO)

        {
            var result = await _productService.UpdateProductItem(babyitemDTO);
            if (result.Success) return Ok(result);

            else return BadRequest(result);
        }

        [HttpPost("/Product/GetPaginatedItems")]

        public async Task<IActionResult> GetPaginatedProductItems([FromForm] ProductFiltersDTO filters)
        {
            var result = await _productService.GetPaginatedProductItems(filters);
            if (result.Success) return Ok(result);

            else return BadRequest(result);
        }

        [HttpPost("/Product/Delete")]

        public async Task<IActionResult> DeleteProduct([FromForm] Guid id)
        {
            var result = await _productService.DeleteProduct(id);
            if (result.Success) return Ok(result);

            else return BadRequest(result);
        }
    }

    
}
