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
            .ForMember(x => x.ProductSizes, opt => opt.MapFrom(src => src.ProductSize != null ? src.ProductSize.Select(x => new ProductSize
            {
                Size = x.Size,
                Quantity = x.Quantity
            }).ToList() : null))
            .ForMember(x => x.ProductType, opt => opt.MapFrom(src => src.ProductCategory));

            CreateMap<ProductClass, ProductDTO>().ForMember(x => x.ProductSizes, opt => opt.MapFrom(src => src.ProductSizes.Select(x => new ProductSizeDTO
            {
                ProductSizeId = x.ProductId,
                Size = x.Size,
                Quantity = x.Quantity
            }).ToList()))
                .ForMember(x => x.TotalCategoryItems, opt => opt.MapFrom(src => src.ProductSizes.Sum(x => x.Quantity))) //this will return all quantities
                 //.ForMember(x => x.TotalCategoryItems, opt=> opt.MapFrom(src => src.CategoryType)
                .ForMember(x => x.TotalSize, opt => opt.MapFrom(src => src.ProductSizes.Count()))
                .ForMember(x => x.ProductPictures, opt => opt.MapFrom(src => src.ProductPictures.Select(x => new ProductPictureDTO
                {
                    PictureId = x.PictureId,
                    FileName = x.FileName,
                    ContentType = x.ContentType,
                    FilePath = x.FilePath
                }).ToList()))
                .ForMember(x => x.ProductCategory, opt => opt.MapFrom(src => src.ProductType));

            //CreateMap<BabySize, BabyDTO>().ForMember(x => x.BabySizes, opt => opt.MapFrom(src => src.Size).FirstOrDefault())
            //.ForMember(x => x.BabySizes, opt => opt.MapFrom(src => src.BabySizes.Select(x => x.Size).FirstOrDefault()));

            CreateMap<ProductSize, ProductDTO>().ForMember(x => x.Price, opt => opt.MapFrom(src => src.Product.Price))
                .ForMember(x => x.Description, opt => opt.MapFrom(src => src.Product.Description))
                .ForMember(x => x.Title, opt => opt.MapFrom(src => src.Product.Description))
                .ForMember(x => x.SubcategoryType, opt => opt.MapFrom(src => src.Product.SubcategoryType))
            .ForMember(x => x.TotalCategoryItems, opt => opt.MapFrom(src => src.Size.Count()))
            .ForMember(x => x.TotalSize, opt => opt.MapFrom(src => src.Size.Count()))
            .ForMember(x => x.ProductSizes, opt => opt.MapFrom(src => src.Product.ProductSizes.Select(x => new ProductSizeDTO
            {
                ProductSizeId = x.ProductId,
                Size = x.Size,
                Quantity = x.Quantity
            }).ToList()))
            .ForMember(x => x.ProductPictures, opt => opt.MapFrom(src => src.Product.ProductPictures.Select(x => new ProductPictureDTO
            {
                PictureId = x.PictureId,
                FileName = x.FileName,
                ContentType = x.ContentType,
                FilePath = x.FilePath
            }).ToList()));







        }
    }
}
