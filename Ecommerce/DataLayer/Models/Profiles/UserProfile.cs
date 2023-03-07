using AutoMapper;
using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Models.User;
using Ecommerce.ServiceLayer.Utils;
using System.Linq;



namespace Ecommerce.DataLayer.Models.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<AdminUser, AdminUserDTO>().ForMember(x => x.CreatedAt, opt => opt.MapFrom(src => GenericFunctions.ParseDateTime(src.CreatedAt)));
            CreateMap<RegularUser, RegularUserDTO>().ForMember(x => x.CreatedAt, opt => opt.MapFrom(src => GenericFunctions.ParseDateTime(src.CreatedAt)));
            CreateMap<ShippingAddressDTO, RegularUser>();
            CreateMap<RegisterAdminDTO, AdminUser>();
            CreateMap<RegisterUserDTO, RegularUser>();
            CreateMap<BaseUser, BaseUserDTO>()
                .ForMember(x => x.CreatedAt, opt => opt.MapFrom(src => GenericFunctions.ParseDateTime(src.CreatedAt)))
                .ForMember(x => x.TotalOrders, opt => opt.MapFrom(src => src.Orders.Count))
                .ForMember(x => x.MoneySpent, opt => opt.MapFrom(src => src.Orders.Sum(x => x.TotalPrice)));


        }
    }
}
