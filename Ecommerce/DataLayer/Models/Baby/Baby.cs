using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.Models.Baby
{
    public class BabyClass
    {
        public Guid BabyId { get; set; }

        //public BabySizeType BabySize { get; set; }

        public int Price { get; set; }

        public string Description { get; set; }

        public string Title { get; set; }

        public ICollection<BabyPicture> BabyPictures { get; set; }

        public ICollection<BabySize> BabySizes { get; set; }

        public CategoryType CategoryType { get; set; }

        //public int Quantity { get; set; }






    }
}
