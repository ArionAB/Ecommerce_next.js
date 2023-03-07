using Ecommerce.DataLayer.DTOs.Order;
using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Utils;
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
            var response = await _orderService.AddOrder(orderDTO);
            if (response.Success)
            {
                return Ok(response);
            }
            else return BadRequest(response);
        }

        [HttpGet("/Order/GetOrders")]

        public async Task<IActionResult> GetOrders([FromQuery] OrderFiltersDTO filters)
        {
            var response = await _orderService.GetOrders(Account.UserId, Account.UserType, filters);
            if (response.Success)  return Ok(response);
            else return BadRequest(response);
            
        }

    }
}
