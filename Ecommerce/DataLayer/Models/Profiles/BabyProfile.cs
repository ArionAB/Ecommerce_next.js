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
                .ForMember(x => x.TotalCategoryItems, opt => opt.MapFrom(src => src.BabySizes.Sum(x => x.Quantity))) //this will return all quantities
                 //.ForMember(x => x.TotalCategoryItems, opt=> opt.MapFrom(src => src.CategoryType)
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

            CreateMap<BabySize, BabyDTO>().ForMember(x => x.Price, opt => opt.MapFrom(src => src.Baby.Price))
                .ForMember(x => x.Description, opt => opt.MapFrom(src => src.Baby.Description))
                .ForMember(x => x.Title, opt => opt.MapFrom(src => src.Baby.Description))
                .ForMember(x => x.CategoryType, opt => opt.MapFrom(src => src.Baby.CategoryType))
            .ForMember(x => x.TotalCategoryItems, opt => opt.MapFrom(src => src.Size.Count()))
            .ForMember(x => x.TotalSize, opt => opt.MapFrom(src => src.Size.Count()))
            .ForMember(x => x.BabySizes, opt => opt.MapFrom(src => src.Baby.BabySizes.Select(x => new BabySizeDTO
            {
                BabySizeId = x.BabySizeId,
                Size = x.Size,
                Quantity = x.Quantity
            }).ToList()))
            .ForMember(x => x.BabyPictures, opt => opt.MapFrom(src => src.Baby.BabyPictures.Select(x => new BabyPictureDTO
            {
                PictureId = x.PictureId,
                FileName = x.FileName,
                ContentType = x.ContentType,
                FilePath = x.FilePath
            }).ToList()));







        }
    }
}
