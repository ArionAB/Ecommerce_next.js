using Ecommerce.DataLayer.Utils;
using System;

namespace Ecommerce.DataLayer.DTOs.Cart
{
    public class RemoveItemDTO
    {
        public Guid ProductId { get; set; }
        public SizeType SizeType { get; set; }
    }

}
       

