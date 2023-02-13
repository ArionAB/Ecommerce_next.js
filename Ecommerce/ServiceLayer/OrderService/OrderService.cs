using AutoMapper;
using AutoMapper.QueryableExtensions;
using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.DTOs.Order;
using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Models.Orders;
using Ecommerce.DataLayer.Models.User;
using Ecommerce.DataLayer.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly MainDbContext _context;
        private readonly IMapper _mapper;

        public OrderService(MainDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }




        public async Task<ServiceResponse<Object>> AddOrder(AddOrderDTO orderDTO, Guid userId)
        {
            try
            {


                var orderId = Guid.NewGuid();
                var newOrder = new Order
                {
                    OrderId = orderId,
                    UserId = userId,
                    DateCreated = DateTime.Now,
                    Status = orderDTO.Status,
                    PaymentMethod = orderDTO.PaymentMethod
                    
                };
               
                await _context.Orders.AddAsync(newOrder);

                foreach (var item in orderDTO.OrderProducts)
                {
                    var orderProduct = new OrderProduct
                    {
                        OrderProductId = Guid.NewGuid(),
                        OrderId = orderId,
                        ProductId = item.ProductId,
                        UserId = userId,
                        FilePath = item.FilePath,
                        Title = item.Title,
                        Price = item.Price,
                        SizeType = item.SizeType,
                        FruitType = item.FruitType,
                        ProductCategory = item.ProductCategory,
                        Quantity = item.Quantity,
                    };
                    await _context.OrderProducts.AddAsync(orderProduct);
                }

                await _context.SaveChangesAsync();
                    
                return new ServiceResponse<Object> { Response = null, Success = true, Message = Messages.Message_AddOrderSuccess };
            }
            catch (Exception e)
            {
                return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_AddOrderError };
            }
                 
           
        }

        public async Task<ServiceResponse<Object>> GetOrders(Guid userId)
        {
            try
            {
                var shippingAddress = await _context.Users.Where(x => x.UserId == userId).ProjectTo<ShippingAddressDTO>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();
                var orders = await _context.Orders.Where(x => x.UserId == userId).ProjectTo<OrderDTO>(_mapper.ConfigurationProvider).ToListAsync();
            

                var obj = new
                {
                    ShippingAddress = shippingAddress,
                    Orders = orders,
              
                };
            

                return new ServiceResponse<Object> { Response = obj,Success= true, Message = Messages.Message_GetOrderSuccess };



            }
            catch (Exception e)
            {
                return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_GetOrderError };
            }
        }
    }
}
                  
                   
                 
                   
               

            


    