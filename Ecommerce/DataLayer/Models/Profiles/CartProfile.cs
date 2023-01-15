using AutoMapper;
using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.DTOs.Cart;
using Ecommerce.DataLayer.Models.Cart;
using System;

namespace Ecommerce.DataLayer.Models.Profiles
{
    public class CartProfile : Profile
    {

        public CartProfile()
        {
            CreateMap<AddItemToCartDTO, CartProduct>();
       
        }
    }
}
