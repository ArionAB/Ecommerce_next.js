using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.ServiceLayer.UsersService;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Ecommerce.Controllers
{
    [ApiController]
    public class UsersController : BaseController
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("/Users/Register")]
        
        public async Task<IActionResult> RegisterUser([FromForm] RegisterUserDTO model)
        {
            var result = await _userService.RegisterUser(model, Request.Headers["origin"]);
            if (result.Success)
                return Ok(result);
            else
                return BadRequest(result);
        }

        [HttpPost("/Users/RegisterAdmin")]

        public async Task<IActionResult> RegisterAdmin(RegisterAdminDTO model)
        {
            var result = await _userService.RegisterAdmin(model, Request.Headers["origin"]);
            if (result.Success)
                return Ok(result);
            else
                return BadRequest(result);
        }
    
    }
}
