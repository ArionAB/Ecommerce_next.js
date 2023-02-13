using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Models.Orders;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Order
{
    public class GetOrdersDTO
    {
        public List<OrderDTO> Orders { get; set; }

        public ShippingAddressDTO ShippingAddress { get; set; }

        public List<OrderProduct> OrderProducts { get; set; }
    }
}
