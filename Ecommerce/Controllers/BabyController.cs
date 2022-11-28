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

        [HttpPost("/Baby/Bodysuit/Add")]

        public async Task<IActionResult> AddBodySuit([FromForm] AddBodysuitDTO bodysuitsDTO)
        {
            var response = await _babyService.Addbodysuit(bodysuitsDTO);
            if (response.Success) return Ok(response);

            else return BadRequest(response);
        }

        [HttpPost("/Baby/Coverall/Add")]

        public async Task<IActionResult> AddCoverall([FromForm] AddCoverallsDTO coverallsDTO)
        {
            var response = await _babyService.AddCoverall(coverallsDTO);
            if (response.Success) return Ok(response);

            else return BadRequest(response);
        }

    }
}
