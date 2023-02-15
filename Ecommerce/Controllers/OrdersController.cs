using Ecommerce.DataLayer.DTOs.Order;
using Ecommerce.ServiceLayer.OrderService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;


namespace Ecommerce.Controllers
{
    [ApiController]
    public class OrdersController : BaseController

    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("/Order/Add")]
        
        public async Task<IActionResult> AddOrder([FromForm] AddOrderDTO orderDTO)
        {
            var response = await _orderService.AddOrder(orderDTO, Account.UserId);
            if (response.Success)
            {
                return Ok(response);
            }
            else return BadRequest(response);
        }

        [HttpGet("/Order/GetOrders")]

        public async Task<IActionResult> GetOrders([FromQuery] Guid userId)
        {
            var response = await _orderService.GetOrders(userId);
            if (response.Success)  return Ok(response);
            else return BadRequest(response);
            
        }

    }
}
