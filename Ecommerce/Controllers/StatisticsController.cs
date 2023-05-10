using Ecommerce.DataLayer.DTOs.Cart;
using Microsoft.AspNetCore.Mvc;
using static Ecommerce.ServiceLayer.CartService.CartServiceInterface;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Ecommerce.ServiceLayer.StatisticsService;

namespace Ecommerce.Controllers
{
    public class StatisticsController : BaseController
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

       

        [HttpGet("/getStatistics")]
       
        public async Task<IActionResult> GetStatistics()

        {
            var response = await _statisticsService.GetStatistics(Account.UserType);
            if (response.Success) return Ok(response);

            else return BadRequest(response);
        }
        

    }
}
