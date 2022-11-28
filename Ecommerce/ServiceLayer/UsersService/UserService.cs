using AutoMapper;
using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Models.User;
using Ecommerce.DataLayer.Utils;
using Ecommerce.ServiceLayer.LogService;
using Ecommerce.ServiceLayer.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace Ecommerce.ServiceLayer.UsersService
{
    public class UserService : IUserService
    {
        
        private readonly MainDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogService _logService;


        public UserService(MainDbContext context, IMapper mapper, ILogService logService)
        {
            _context = context;
            _mapper = mapper;
            _logService = logService;
        }

      public async Task<ServiceResponse<Object>> RegisterUser(RegisterUserDTO model, string origin)
        {
            try
            {
                //validate
                if (await _context.Users.AnyAsync(x => x.Email == model.Email))
                {
                    // send already registered error in email to prevent account enumeration
                    return new ServiceResponse<Object> { Response = (string)null, Success = false, Message = Messages.Message_EmailAlreadyUsed };
                }

                // map model to new account object

                var account = _mapper.Map<RegularUser>(model);
                account.UserType = UserType.User;
                account.CreatedAt = GenericFunctions.GetCurrentDateTime();
                account.Password = BC.HashPassword(model.Password);

                _context.Users.Add(account);

                _context.SaveChanges();

                //am ramas sa adaug Log service

                try
                {
                    await _logService.LogInfo("Registering applicant user: ", model);
                }
                catch (Exception e)
                {
                    _logService.LogError(e, model);
                }

                return new ServiceResponse<Object> { Response = (string)null, Success = true, Message = Messages.Message_RegisterUserSuccess };
            }
            catch (Exception e)
            {
                _logService.LogError(e, model);
                return new ServiceResponse<Object> { Response = (string)null, Success = false, Message = Messages.Message_RegisterUserError };
            }
        }

        public async Task<ServiceResponse<Object>> RegisterAdmin(RegisterAdminDTO model, string origin)
        {
            try
            {
                //validate
                if (await _context.Users.AnyAsync(x => x.Email == model.Email))
                {
                    // send already registered error in email to prevent account enumeration
                    return new ServiceResponse<Object> { Response = (string)null, Success = false, Message = Messages.Message_EmailAlreadyUsed };
                }

                // map model to new account object

                var account = _mapper.Map<AdminUser>(model);

                account.UserType = UserType.Admin;
                account.CreatedAt = GenericFunctions.GetCurrentDateTime();
                account.Password = BC.HashPassword(model.Password);
                

                //save account

                _context.Users.Add(account);
                _context.SaveChanges();
                
                try
                {
                    await _logService.LogInfo("Registering admin user: ", model);
                }
                catch (Exception e)
                {
                    _logService.LogError(e, model);
                }
                return new ServiceResponse<Object> { Response = (string)null, Success = true, Message = Messages.Message_RegisterUserSuccess };
            }
            catch (Exception e)
            {
                _logService.LogError(e, model);
                return new ServiceResponse<Object> { Response = (string)null, Success = false, Message = Messages.Message_RegisterUserError };
            }
    }
    }
    
    
}
