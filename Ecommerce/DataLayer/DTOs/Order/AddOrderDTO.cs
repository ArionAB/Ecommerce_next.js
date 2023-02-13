using Ecommerce.DataLayer.Models.Orders;
using Ecommerce.DataLayer.Utils;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Order
{
    public class AddOrderDTO
    {
       
        public List<OrderProduct> OrderProducts { get; set; }
        public OrderStatusType Status { get; set; }

        public PaymentMethodType PaymentMethod { get; set; }
       
    }

}

      

