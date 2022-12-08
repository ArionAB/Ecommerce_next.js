using System;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.Models.Baby
{
    public class ProductPicture
    {

        public Guid PictureId { get; set; }

        public Guid ProductId { get; set; }

        public ProductClass Product { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public string FilePath { get; set; }


    }
}
