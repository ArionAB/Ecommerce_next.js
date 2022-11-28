using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.Utils;
using System;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.BabyService
{
    public interface IBabyService
    {
        Task<ServiceResponse<Object>> AddBabyItem(AddBabyItemDTO babyitemDTO);

       
    }
}
