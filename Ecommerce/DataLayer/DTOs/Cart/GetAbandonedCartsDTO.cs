

using Ecommerce.DataLayer.Models.Cart;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Cart
{
    public class GetAbandonedCartsDTO
    {
        public List<CartClass> AbandonedCarts { get; set; }

        public int Count { get; set; }

        public int TotalPages { get; set; }
    }
}
