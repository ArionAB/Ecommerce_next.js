using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.Utils;
using System;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.BabyService
{
    public interface IBabyService
    {
        Task<ServiceResponse<Object>> Addbodysuit(AddBodysuitDTO bodysuitsDTO);

        Task<ServiceResponse<Object>> AddCoverall(AddCoverallsDTO coverallsDTO);
    }
}
