using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Models.User;
using Ecommerce.DataLayer.Utils;
using Ecommerce.ServiceLayer.UsersService;
using Ecommerce.ServiceLayer.Utils;
using Microsoft.AspNetCore.Http;

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
            var result = await _userService.RegisterUser(model, Request.Headers["origin"], ipAddress());
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
        [HttpPost("/Users/Login")]

        public async Task<IActionResult> Authenticate([FromForm] AuthenticateDTO model)
        {
            var authenticateUser = await _userService.Authenticate(model, ipAddress());
            if (authenticateUser.Success)
            {
                setTokenCookie(authenticateUser.Response.RefreshToken);
                return Ok(new { Response = authenticateUser.Response, Message = authenticateUser.Message, Success = authenticateUser.Success });
            }
            else
            {
                return BadRequest(new { Message = authenticateUser.Message, Error = "Eroare autentificare" });
            }
        }
        [HttpPost("/Users/UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromForm] ShippingAddressDTO model)
        {
            var result = await _userService.UpdateUser(Account.UserId, model);
            if (result.Success)
                return Ok(result);
            else
                return BadRequest(result);
        }

        [HttpPost("/Users/RefreshToken")]

        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var response = await _userService.RefreshToken(refreshToken, ipAddress());
            if (response.Success)
            {
                setTokenCookie(response.Response.RefreshToken);
                return Ok(new { Response = response.Response, Message = response.Message, Success = response.Success });
            }
            else
            {
                return BadRequest(new { Message = response.Message, Error = "Eroare refreshToken" });
            }
        }

        [HttpPost("/Users/RevokeToken")]

        public async Task<IActionResult> RevokeToken(string tokenToReset)

        {
            // accept token from request body or cookie
            var token = tokenToReset ?? Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(token))
                return BadRequest(new { message = "Token is required" });

            // users can revoke their own tokens and admins can revoke any tokens
            if (!Account.OwnsToken(token) && Account.UserType != UserType.Admin)
                return Unauthorized(new { message = "Unauthorized" });

            var result = await _userService.RevokeToken(token, ipAddress());
            if (result.Success)
                return Ok(result);
            else
                return BadRequest(result);
        }

        //helper methods

        private string ipAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }

        private void setTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                Expires = GenericFunctions.GetCurrentDateTime().AddDays(7),
                SameSite = SameSiteMode.None
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }

        [HttpGet("/Users/GetAllUsers")]
        public async Task<IActionResult> GetAllUsers([FromQuery] GetUsersFiltersDTO filters)
        {
            var result = await _userService.GetAllUsers(filters);
            if (result.Success)
                return Ok(result);
            else
                return BadRequest(result);
        }

        [HttpPost("/Users/ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            var result = await _userService.ForgotPassword(email, Request.Headers["origin"]);
            if (result.Success)
                return Ok(result);
            else
                return BadRequest(result);
        }

        [HttpPost("/Users/ValidateResetToken")]
        public async Task<IActionResult> ValidateResetToken([FromQuery] string token)
        {
            var result = await _userService.ValidateResetToken(token);
            if (result.Success)
                return Ok(result);
            else
                return BadRequest(result);
        }

        [HttpPost("/Users/ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO model)
        {
            var result = await _userService.ResetPassword(model);
            if (result.Success)
                return Ok(result);
            else
                return BadRequest(result);
        }
    }

    
}
