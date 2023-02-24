using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Order
{
    public class OrderDTO
    {
        public Guid OrderId { get; set; }

        public Guid UserId { get; set; }

        public DateTime DateCreated { get; set; }

        public OrderStatusType Status { get; set; }

        public PaymentMethodType PaymentMethod { get; set; }

        public int TotalPrice { get; set; }

        public int TotalProducts { get; set; }
        public List<OrderProductDTO> OrderProducts { get; set; }
        public ShippingAddressDTO ShippingAddress { get; set; }
        




    }
}
