using AutoMapper;
using AutoMapper.QueryableExtensions;
using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.DTOs.Order;
using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Models.Orders;
using Ecommerce.DataLayer.Models.User;
using Ecommerce.DataLayer.Utils;
using Ecommerce.ServiceLayer.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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




        public async Task<ServiceResponse<Object>> AddOrder(AddOrderDTO orderDTO)
        {
            try
            {

                var TotalPrice = 0;
                var orderId = Guid.NewGuid();
              

                foreach (var item in orderDTO.OrderProducts)
                {
                    var orderProduct = new OrderProduct
                    {
                        OrderProductId = Guid.NewGuid(),
                        OrderId = orderId,
                        ProductId = item.ProductId,
                        //UserId = (Guid)(string.IsNullOrEmpty(orderDTO.UserId.ToString()) ? null : orderDTO.UserId),
                        UserId = orderDTO.UserId == null ? Guid.Empty : new Guid(orderDTO.UserId.ToString()),
                        FilePath = item.FilePath,
                        Title = item.Title,
                        Price = item.Price,
                        SizeType = item.SizeType,
                        FruitType = item.FruitType,
                        ProductCategory = item.ProductCategory,
                        Quantity = item.Quantity,
                        
                    };
                    await _context.OrderProducts.AddAsync(orderProduct);
                TotalPrice += item.Price * item.Quantity;
                }

                if (orderDTO.UserId == null)
                {
                    // Add the order without a user record
                    var newOrderAsGuest = new Order
                    {
                        OrderId = orderId,
                        DateCreated = DateTime.Now,
                        Status = orderDTO.Status,
                        PaymentMethod = orderDTO.PaymentMethod,
                        TotalPrice = TotalPrice,
                        UserId = Guid.Empty
                    };

                    await _context.Orders.AddAsync(newOrderAsGuest);
                    await _context.SaveChangesAsync();

                    // Add the shipping address to a separate table
                
                    var shippingAddress = _mapper.Map<ShippingAddressDTO>(orderDTO.Address);
                    shippingAddress.OrderId = orderId;
                    shippingAddress.OrderAddressId = Guid.NewGuid();
                    await _context.OrderAddress.AddAsync(_mapper.Map<OrderAddress>(shippingAddress));
                  

                

                    //await _context.OrderAddress.AddAsync(shippingAddress);
                    await _context.SaveChangesAsync();

                    return new ServiceResponse<Object> { Response = null, Success = true, Message = Messages.Message_AddOrderSuccess };
                } else
                {

                    var newOrder = new Order
                    {
                        OrderId = orderId,
                        DateCreated = DateTime.Now,
                        Status = orderDTO.Status,
                        PaymentMethod = orderDTO.PaymentMethod,
                        TotalPrice = TotalPrice,
                        UserId = orderDTO.UserId

                    };

                    await _context.Orders.AddAsync(newOrder);

                    var shippingAddress = await _context.Users.Where(x => x.UserId == orderDTO.UserId).ProjectTo<ShippingAddressDTO>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();
                    shippingAddress.OrderId = orderId;
                    shippingAddress.OrderAddressId = Guid.NewGuid();
                    await _context.OrderAddress.AddAsync(_mapper.Map<OrderAddress>(shippingAddress));

                    await _context.SaveChangesAsync();
                }


                return new ServiceResponse<Object> { Response = null, Success = true, Message = Messages.Message_AddOrderSuccess };

            }
            catch (Exception e)
            {
                return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_AddOrderError };
            }
                 
           
        }

        public async Task<ServiceResponse<GetPaginatedOrdersDTO>> GetOrders(Guid userId, UserType userType, OrderFiltersDTO filters)
        {
            try
            {
             
                var totalCount = _context.Orders.Where(x => userType == UserType.User ? x.UserId == userId : true)
                    .Where(x => filters.SearchText != null ? ( (x.User.FirstName + " " + x.User.LastName).Contains(filters.SearchText) || x.OrderId.ToString().Contains(filters.SearchText)) : true)
                    .Where(x => filters.Status != 0 ? x.Status == filters.Status : true)
                    .Where(x => String.IsNullOrEmpty(filters.FirstEntryDate) ? true :
                    DateTime.Compare((DateTime)GenericFunctions.ParseStringToDateTime(filters.FirstEntryDate), x.DateCreated) <= 0)
                    .Where(x => String.IsNullOrEmpty(filters.SecondEntryDate) ? true :
                    DateTime.Compare((DateTime)GenericFunctions.ParseStringToDateTime(filters.SecondEntryDate), x.DateCreated) >= 0)
                    .Count();
                var orders = getFilteredPaginatedOrders(filters, userId, userType);
                var totalPages = totalCount / 10;
                if (totalCount == 10) totalPages -= 1;
              

                var response = new GetPaginatedOrdersDTO
                {
                    TotalCount = totalCount,
                    Orders = orders,
                    TotalPages = totalPages,
                    PageNumber = filters.PageNumber
                  
                };



                return new ServiceResponse<GetPaginatedOrdersDTO> { Response = response, Success= true, Message = Messages.Message_GetOrderSuccess };



            }
            catch (Exception e)
            {
                return new ServiceResponse<GetPaginatedOrdersDTO> { Response = null, Success = false, Message = Messages.Message_GetOrderError };
            }
        }

        private List<OrderDTO> getFilteredPaginatedOrders(OrderFiltersDTO filters, Guid userId, UserType userType)
        {
            var orders = new List<OrderDTO>();
            switch (filters.OrderToSortBy)
            {
                case OrderSortBy.CreatedAt:
                    if (filters.SortingOrder)
                    {
                    
                        orders = _mapper.ProjectTo<OrderDTO>(_context.Orders.Where(x => userType == UserType.User ? x.UserId == userId : true)
                            .Where(x => filters.SearchText != null ? ((x.User.FirstName + " " + x.User.LastName).Contains(filters.SearchText)
                            || x.OrderId.ToString().Contains(filters.SearchText)) : true)
                            .Where(x => filters.Status != 0 ? x.Status == filters.Status : true)
                            .Where(x => String.IsNullOrEmpty(filters.FirstEntryDate) ? true :
                            DateTime.Compare((DateTime)GenericFunctions.ParseStringToDateTime(filters.FirstEntryDate), x.DateCreated) <= 0)
                            .Where(x => String.IsNullOrEmpty(filters.SecondEntryDate) ? true :
                            DateTime.Compare((DateTime)GenericFunctions.ParseStringToDateTime(filters.SecondEntryDate), x.DateCreated) >= 0)
                            .OrderBy(x => x.DateCreated).Skip(filters.PageNumber * 10).Take(10)).ToList();
                    }
                    else
                    {
                      
                        orders = _mapper.ProjectTo<OrderDTO>(_context.Orders.Where(x => userType == UserType.User ? x.UserId == userId : true)
                            .Where(x => filters.SearchText != null ? ((x.User.FirstName + " " + x.User.LastName).Contains(filters.SearchText)
                            || x.OrderId.ToString().Contains(filters.SearchText)) : true)
                            .Where(x => filters.Status != 0 ? x.Status == filters.Status : true)
                            .Where(x => String.IsNullOrEmpty(filters.FirstEntryDate) ? true :
                            DateTime.Compare((DateTime)GenericFunctions.ParseStringToDateTime(filters.FirstEntryDate), x.DateCreated) <= 0)
                            .Where(x => String.IsNullOrEmpty(filters.SecondEntryDate) ? true :
                            DateTime.Compare((DateTime)GenericFunctions.ParseStringToDateTime(filters.SecondEntryDate), x.DateCreated) >= 0)
                            .OrderByDescending(x => x.DateCreated).Skip(filters.PageNumber * 10).Take(10)).ToList();
                    }
                    break;

                case OrderSortBy.County:
                    {
                        if (filters.SortingOrder)
                        {
                            orders = _mapper.ProjectTo<OrderDTO>(_context.Orders.Where(x => userType == UserType.User ? x.UserId == userId : true)
                           .Where(x => filters.SearchText != null ? ((x.User.FirstName + " " + x.User.LastName).Contains(filters.SearchText)
                           || x.OrderId.ToString().Contains(filters.SearchText)) : true)
                           .Where(x => filters.Status != 0 ? x.Status == filters.Status : true)
                           .Where(x => String.IsNullOrEmpty(filters.FirstEntryDate) ? true :
                           DateTime.Compare((DateTime)GenericFunctions.ParseStringToDateTime(filters.FirstEntryDate), x.DateCreated) <= 0)
                           .Where(x => String.IsNullOrEmpty(filters.SecondEntryDate) ? true :
                           DateTime.Compare((DateTime)GenericFunctions.ParseStringToDateTime(filters.SecondEntryDate), x.DateCreated) >= 0)
                           .OrderBy(x => x.OrderAddress.County).Skip(filters.PageNumber * 10).Take(10)).ToList();
                        }

                        else
                        {
                            orders = _mapper.ProjectTo<OrderDTO>(_context.Orders.Where(x => userType == UserType.User ? x.UserId == userId : true)
                            .Where(x => filters.SearchText != null ? ((x.User.FirstName + " " + x.User.LastName).Contains(filters.SearchText)
                  |          x.OrderId.ToString().Contains(filters.SearchText)) : true)
                             .Where(x => filters.Status != 0 ? x.Status == filters.Status : true)
                             .Where(x => String.IsNullOrEmpty(filters.FirstEntryDate) ? true :
                             DateTime.Compare((DateTime)GenericFunctions.ParseStringToDateTime(filters.FirstEntryDate), x.DateCreated) <= 0)
                             .Where(x => String.IsNullOrEmpty(filters.SecondEntryDate) ? true :
                             DateTime.Compare((DateTime)GenericFunctions.ParseStringToDateTime(filters.SecondEntryDate), x.DateCreated) >= 0)
                            .OrderByDescending(x => x.OrderAddress.County).Skip(filters.PageNumber * 10).Take(10)).ToList();
                        }
                    }

                    break;
            }

            return orders;
            
        }
    }
}







               

              
               
             

               
           
               

               


                  
            

              
                   
                   
                
               
            
                   
                 
                   
               

            


    