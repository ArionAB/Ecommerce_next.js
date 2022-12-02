using System;

namespace Ecommerce.DataLayer.Models.Baby
{
    public class BabySize
    {
        public Guid BabySizeId { get; set; }

        public Guid BabyId { get; set; }

        public BabyClass Baby { get; set; }

        public string Size { get; set; }

        public int Quantity { get; set; }
    }
}
