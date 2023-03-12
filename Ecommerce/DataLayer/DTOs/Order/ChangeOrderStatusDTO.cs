using Ecommerce.DataLayer.Utils;
using System;

namespace Ecommerce.DataLayer.DTOs.Order
{
    public class ChangeOrderStatusDTO
    {
        public Guid OrderId { get; set; }
        public OrderStatusType Status { get; set; }
    }
}
