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

            CreateMap<BabyClass, BabyDTO>().ForMember(x => x.BabySizes, opt => opt.MapFrom(src => src.BabySizes.Select(x => new BabySizeDTO
            {
                BabySizeId = x.BabySizeId,
                Size = x.Size,
                Quantity = x.Quantity
            }).ToList()))
                .ForMember(x => x.TotalItems, opt => opt.MapFrom(src => src.BabySizes.Sum(x => x.Quantity)))
                .ForMember(x => x.TotalSize, opt => opt.MapFrom(src => src.BabySizes.Count()))
                .ForMember(x => x.BabyPictures, opt => opt.MapFrom(src => src.BabyPictures.Select(x => new BabyPictureDTO
                {
                    PictureId = x.PictureId,
                    FileName = x.FileName,
                    ContentType = x.ContentType,
                    FilePath = x.FilePath
                }).ToList()));

            //CreateMap<BabySize, BabyDTO>().ForMember(x => x.BabySizes, opt => opt.MapFrom(src => src.Size).FirstOrDefault())
            //.ForMember(x => x.BabySizes, opt => opt.MapFrom(src => src.BabySizes.Select(x => x.Size).FirstOrDefault()));

            CreateMap<BabySize, BabyDTO>();
              
                


        }
    }
}
