using Ecommerce.DataLayer.Models.Baby.Bodysuits;
using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.Models.Baby.Coverall
{
    public class CoverallClass
    {
        [Key]
        public Guid CoverallsId { get; set; }

        

        public CoverallsSizeType CoverallsSizeType { get; set; }
        

        public int Price { get; set; }

        public string Description { get; set; }

        public string Title { get; set; }

        public ICollection<CoverallPicture> CoverallPictures { get; set; }

        public CategoryType CategoryType { get; set; }
    }
}
