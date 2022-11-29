using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.ServiceLayer.BabyService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Ecommerce.Controllers
{
    [ApiController]
    public class BabyController : BaseController
    {

        private readonly IBabyService _babyService;

        public BabyController(IBabyService babyService)
        {
            _babyService = babyService;
        }

        [HttpPost("/Baby/Add")]
        
        public async Task<IActionResult> AddBabyItem([FromForm] AddBabyItemDTO babyitemDTO)
        {
            var response = await _babyService.AddBabyItem(babyitemDTO);
            if (response.Success) return Ok(response);

            else return BadRequest(response);
        }

        [HttpGet("/Baby/GetItems")]
        
        public async Task<IActionResult> GetBabyItems()
        {
            var result = await _babyService.GetBabyItems();
            if (result.Success) return Ok(result);

            else return BadRequest(result);
        }

        [HttpGet("/Baby/GetItem")]

        public async Task<IActionResult> GetBabyItem([FromQuery] Guid id)
        {
            var result = await _babyService.GetBabyItem(id);
            if (result.Success) return Ok(result);

            else return BadRequest(result);
        }

        [HttpPost("/Baby/Update")]
        
        public async Task<IActionResult> UpdateBabyItem([FromForm]UpdateBabyItemDTO babyitemDTO)

        {
            var result = await _babyService.UpdateBabyItem(babyitemDTO);
            if (result.Success) return Ok(result);

            else return BadRequest(result);
        }

    }
}
