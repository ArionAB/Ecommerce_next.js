using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.ServiceLayer.BabyService;
using Microsoft.AspNetCore.Mvc;
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

      

    }
}
