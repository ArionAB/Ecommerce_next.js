using Ecommerce.DataLayer.DTOs.Order;
using Ecommerce.DataLayer.Utils;
using System;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.OrderService
{
    
    
        public interface IOrderService
        {
            Task<ServiceResponse<Object>> AddOrder(AddOrderDTO orderDTO, Guid userId);
            Task<ServiceResponse<GetPaginatedOrdersDTO>> GetOrders(Guid userId, UserType userType, OrderFiltersDTO filters);

    }
    
}
