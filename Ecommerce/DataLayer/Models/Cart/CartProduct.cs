using Ecommerce.DataLayer.Models.Baby;
using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Xml.Serialization;

namespace Ecommerce.DataLayer.Models.Cart
{
    public class CartProduct
    {
        public Guid CartProductId { get; set; }
        public Guid CartId { get; set; }
        //[XmlIgnore]
        //[IgnoreDataMember]
        public  CartClass Cart { get; set; }
        
        public Guid ProductId { get; set; }
        
        //[XmlIgnore]
        //[IgnoreDataMember]
        public  ProductClass Product { get; set; }
        public SizeType SizeType { get; set; }

        public int Quantity { get; set; }

        






    }
}
