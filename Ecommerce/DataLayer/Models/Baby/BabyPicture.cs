using System;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.Models.Baby
{
    public class BabyPicture
    {

        public Guid PictureId { get; set; }

        public Guid BabyId { get; set; }

        public BabyClass Baby { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public string FilePath { get; set; }


    }
}
