using AutoMapper;
using Ecommerce.DataLayer.DTOs.Order;
using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Models.Orders;
using Ecommerce.DataLayer.Models.User;
using System.Linq;

namespace Ecommerce.DataLayer.Models.Profiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<Order, OrderDTO>();
     
            CreateMap<BaseUser, ShippingAddressDTO>();

            CreateMap<OrderProduct, OrderProductDTO>();

            CreateMap<Order, OrderDTO>()
           .ForMember(x => x.OrderProducts, opt => opt.MapFrom(src => src.OrderProducts.Select(x => new OrderProductDTO
           {
               OrderProductId = x.OrderProductId,
               ProductId = x.ProductId,
               Quantity = x.Quantity,
               Price = x.Price,
               SizeType = x.SizeType,
               FruitType = x.FruitType,
               ProductCategory = x.ProductCategory,
               Title = x.Title,
               FilePath = x.FilePath
           }).ToList()))
            .ForMember(x => x.TotalProducts, opt => opt.MapFrom(src => src.OrderProducts.Sum(x => x.Quantity)));

        }
    
    }

}





             


    
