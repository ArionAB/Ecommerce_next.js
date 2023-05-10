using Ecommerce.DataLayer.Models.Cart;
using Ecommerce.DataLayer.Models.Orders;
using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;


namespace Ecommerce.DataLayer.Models.Baby
{
    public class ProductClass
    {
   
        public Guid ProductId { get; set; }

       

        public int PriceKg { get; set; }

        public int PriceHalf { get; set; }

        public string Description { get; set; }

        public string Title { get; set; }

        public ICollection<ProductPicture> ProductPictures { get; set; }

        public ProductCategoryType ProductType { get; set; }

        public FruitType FruitType { get; set; }
        public List<CartProduct> CartProducts { get; set; }

        public List<OrderProduct> OrderProducts { get; set; }

        public bool InStock { get; set; }

      

       












    }
}
