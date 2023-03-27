﻿using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Utils;
using System;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.UsersService
{
    public interface IUserService
    {
        Task<ServiceResponse<Object>> RegisterUser(RegisterUserDTO model, string origin, string ipAddress);

        Task<ServiceResponse<Object>> RegisterAdmin(RegisterAdminDTO model, string origin);

        Task<ServiceResponse<BaseUserDTO>> Authenticate(AuthenticateDTO model, string ipAddress);

        Task<ServiceResponse<BaseUserDTO>> RefreshToken(string token, string ipAddress);

        Task<ServiceResponse<Object>> RevokeToken(string token, string ipAddress);

        Task<ServiceResponse<RegularUserDTO>> UpdateUser(Guid loggedInUserId, ShippingAddressDTO model);

        Task<ServiceResponse<PaginatedUsersDTO>> GetAllUsers(GetUsersFiltersDTO filters);

        Task<ServiceResponse<Object>> ForgotPassword(string email, string origin);

        Task<ServiceResponse<Object>> ValidateResetToken(string token);
        Task<ServiceResponse<Object>> ResetPassword(ResetPasswordDTO model);
    }
}
