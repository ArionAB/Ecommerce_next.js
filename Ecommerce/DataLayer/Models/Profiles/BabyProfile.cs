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

                }).ToList() : null));
                //.ForMember(x => x.BodysuitsPicturesList, opt => opt.MapFrom(src => src.Pictures));
                //.ForMember(x => x.BodysuitsPicturesList, opt => opt.MapFrom(src => src.Pictures != null ? new BodysuitsPicturesListDTO
                //{
                //    //BodysuitsPicturesId = (src as BodysuitsPicturesListDTO).BodysuitsPicturesId,
                //   BodysuitsPicturesList =  src.Pictures.
                //    {
                //        FileName = src.Pictures.FileName,
                //        ContentType = src.Pictures.ContentType,
                //        FilePath = src.Pictures.FilePath
                //    }
                //} : null);
             
            //CreateMap<BodysuitsPictureDTO, BodysuitsPicture>().ForMember(x => x.PictureId, opt => opt.MapFrom(src => src.PictureId));
            //CreateMap<AddBodysuitDTO, Bodysuits
            CreateMap<BabyClass, BabyDTO>();
            
        }
    }
}
