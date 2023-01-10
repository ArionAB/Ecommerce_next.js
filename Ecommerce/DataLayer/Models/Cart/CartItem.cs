using Ecommerce.DataLayer.Models.Baby;
using Ecommerce.DataLayer.Utils;
using System;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.Models.Cart
{
    public class CartItem
    {
        [Key]

        public Guid ItemId { get; set; }

        public Guid CartId { get; set; }

        public int Quantity { get; set; }

        public SizeType SizeType { get; set; }

        public DateTime DateCreated { get; set; }

        public virtual ProductClass Product { get; set; }
    }
}
