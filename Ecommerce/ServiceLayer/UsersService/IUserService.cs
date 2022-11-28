using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Utils;
using System;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.UsersService
{
    public interface IUserService
    {
        Task<ServiceResponse<Object>> RegisterUser(RegisterUserDTO model, string origin);

        Task<ServiceResponse<Object>> RegisterAdmin(RegisterAdminDTO model, string origin);
    }
}
