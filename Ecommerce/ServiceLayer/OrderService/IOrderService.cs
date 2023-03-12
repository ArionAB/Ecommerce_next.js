using Ecommerce.DataLayer.DTOs.Order;
using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Utils;
using System;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.OrderService
{
    
    
        public interface IOrderService
        {
            Task<ServiceResponse<Object>> AddOrder(AddOrderDTO orderDTO);
            Task<ServiceResponse<GetPaginatedOrdersDTO>> GetOrders(Guid userId, UserType userType, OrderFiltersDTO filters);
        Task<ServiceResponse<Object>> ChangeOrderStatus(Guid orderId, OrderStatusType status, UserType userType);

    }
    
}
