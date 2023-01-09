using Ecommerce.DataLayer.Models.User;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.Models.Cart
{
    public class CartClass
    {
        [Key]
        public Guid CartId { get; set; }
        public Guid UserId { get; set; }
        public BaseUser User { get; set; }

        public List<CartProduct> CartProducts { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

    }

}





