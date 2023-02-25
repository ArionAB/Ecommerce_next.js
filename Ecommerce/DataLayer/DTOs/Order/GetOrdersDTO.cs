using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Models.Orders;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Order
{
    public class GetPaginatedOrdersDTO
    {
        public List<OrderDTO> Orders { get; set; }

        public int PageNumber { get; set; }

        public int TotalPages { get; set; }

        public int TotalCount { get; set; }

        


    }
}
