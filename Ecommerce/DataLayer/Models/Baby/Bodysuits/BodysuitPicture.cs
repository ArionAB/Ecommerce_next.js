using System;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.Models.Baby.Bodysuits
{
    public class BodysuitPicture
    {
     
        public Guid PictureId { get; set; }
     
        public Guid BodysuitId { get; set; }

        public Bodysuit Bodysuit { get; set; }

        public string FileName { get; set; }
        public string ContentType { get; set; }
        public string FilePath { get; set; }


    }
}
