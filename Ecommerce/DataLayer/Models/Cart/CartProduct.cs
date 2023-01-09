using Ecommerce.DataLayer.Models.Baby;
using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.Models.Cart
{
    public class CartProduct
    {
        public Guid CartId { get; set; }

        public CartClass Cart { get; set; }

        public Guid ProductId { get; set; }
   
        public List<ProductClass> Product { get; set; }

        public SizeType SizeType { get; set; }


    }
}
