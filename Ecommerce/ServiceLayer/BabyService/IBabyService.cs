using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.BabyService
{
    public interface IBabyService
    {
        Task<ServiceResponse<Object>> AddBabyItem(AddBabyItemDTO babyitemDTO);

        Task<ServiceResponse<List<BabyDTO>>> GetBabyItems();

        Task<ServiceResponse<BabyDTO>> GetBabyItem(Guid id);

        Task<ServiceResponse<BabyDTO>> UpdateBabyItem(UpdateBabyItemDTO babyitemDTO);




    }
}
