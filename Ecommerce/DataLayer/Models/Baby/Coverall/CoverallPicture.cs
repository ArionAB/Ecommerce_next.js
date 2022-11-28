using System;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.Models.Baby.Coverall
{
    public class CoverallPicture
    {
        [Key]
        public Guid PictureId { get; set; }

        public Guid CoverallsId { get; set; }

        public CoverallClass Coverall { get; set; }

        public string FileName { get; set; }
        public string ContentType { get; set; }
        public string FilePath { get; set; }
    }
}
