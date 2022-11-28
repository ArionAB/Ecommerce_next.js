using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.Models.Baby.Bodysuits
{
    public class Bodysuit
    {
        public Guid BodysuitsId { get; set; }

        

      

        public BodysuitsSizeType BodySuitsSizeType { get; set; }

       
        public int Price { get; set; }
       
        public string Description { get; set; }

        public string Title { get; set; }

        public ICollection<BodysuitPicture> BodysuitPictures { get; set; }

        public CategoryType CategoryType { get; set; }

    }
}
