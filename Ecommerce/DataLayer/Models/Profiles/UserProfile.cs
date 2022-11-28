using AutoMapper;
using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Models.User;
using Ecommerce.ServiceLayer.Utils;

namespace Ecommerce.DataLayer.Models.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<AdminUser, AdminUserDTO>().ForMember(x => x.CreatedAt, opt => opt.MapFrom(src => GenericFunctions.ParseDateTime(src.CreatedAt)));
            CreateMap<RegularUser, RegularUserDTO>().ForMember(x => x.CreatedAt, opt => opt.MapFrom(src => GenericFunctions.ParseDateTime(src.CreatedAt)));

            CreateMap<RegisterAdminDTO, AdminUser>();
            CreateMap<RegisterUserDTO, RegularUser>();
            CreateMap<BaseUser, BaseUserDTO>().ForMember(x => x.CreatedAt, opt => opt.MapFrom(src => GenericFunctions.ParseDateTime(src.CreatedAt)));
        }
    }
}
