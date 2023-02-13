
using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Models.User;
using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.Models.Orders
{
    public class Order
    {
        [Key]

        public Guid OrderId { get; set; }

        public Guid UserId { get; set; }
        public virtual BaseUser User { get; set; }
        
        public List<OrderProduct> OrderProducts{get; set;}

         

        public DateTime DateCreated { get; set; }
   
        public OrderStatusType Status { get; set; }

        public PaymentMethodType PaymentMethod { get; set; }
        



    }
}
