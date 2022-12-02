using AutoMapper;
using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.Models.Baby;
using System.Linq;

namespace Ecommerce.DataLayer.Models.Profiles
{
    public class BabyProfile : Profile
    {

        public BabyProfile()
        {
            CreateMap<AddBabyItemDTO, BabyClass>()
                .ForMember(x => x.BabyPictures, opt => opt.MapFrom(src => src.Pictures != null ? src.Pictures.Select(x => new BabyPicture
                {
                    FileName = x.FileName,
                    ContentType = x.ContentType,

                }).ToList() : null))
            .ForMember(x => x.BabySizes, opt => opt.MapFrom(src => src.BabySize != null ? src.BabySize.Select(x => new BabySize
             {
                 Size = x.Size,
                 Quantity = x.Quantity
             }).ToList() : null));

            CreateMap<BabyClass, BabyDTO>();
            CreateMap<UpdateBabyItemDTO, BabyClass>().ForPath(x => x.BabyPictures, opt => opt.MapFrom(src => src.NewAdditionalPictures.Select(x => new BabyPicture
            {
                FileName = x.FileName,
                ContentType = x.ContentType,
            }).ToList()));

        }
    }
}
