using AutoMapper;
using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.Models.Baby;
using System.Linq;

namespace Ecommerce.DataLayer.Models.Profiles
{
    public class ProductProfile : Profile
    {

        public ProductProfile()
        {
            CreateMap<AddProductItemDTO, ProductClass>()
                .ForMember(x => x.ProductPictures, opt => opt.MapFrom(src => src.Pictures != null ? src.Pictures.Select(x => new ProductPicture
                {
                    FileName = x.FileName,
                    ContentType = x.ContentType,

                }).ToList() : null))

            .ForMember(x => x.ProductType, opt => opt.MapFrom(src => src.ProductCategory));

            CreateMap<ProductClass, ProductDTO>()

                .ForMember(x => x.ProductPictures, opt => opt.MapFrom(src => src.ProductPictures.Select(x => new ProductPictureDTO
                {
                    PictureId = x.PictureId,
                    FileName = x.FileName,
                    ContentType = x.ContentType,
                    FilePath = x.FilePath
                }).ToList()))
                .ForMember(x => x.ProductCategory, opt => opt.MapFrom(src => src.ProductType))
            .ForMember(x => x.FruitType, opt => opt.MapFrom(src => src.FruitType));


            CreateMap<UpdateProductItemDTO, ProductClass>()
                    .ForMember(x => x.ProductPictures, opt => opt.MapFrom(src => src.NewAdditionalPictures != null ? src.NewAdditionalPictures.Select(x => new ProductPicture
                    {
                        FileName = x.FileName,
                        ContentType = x.ContentType,

                    }).ToList() : null))
    
            .ForMember(x => x.ProductType, opt => opt.MapFrom(src => src.ProductCategory));







        }
    }
}
