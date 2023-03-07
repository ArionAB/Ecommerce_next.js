using AutoMapper;
using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.DTOs.User;
using Ecommerce.DataLayer.Models.Cart;
using Ecommerce.DataLayer.Models.User;
using Ecommerce.DataLayer.Utils;
using Ecommerce.ServiceLayer.LogService;
using Ecommerce.ServiceLayer.Utils;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;


namespace Ecommerce.ServiceLayer.UsersService
{
    public class UserService : IUserService
    {
        
        private readonly MainDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogService _logService;
        private readonly AppSettings _appSettings;
    


        public UserService(MainDbContext context, IMapper mapper, ILogService logService, IOptions<AppSettings> appSettings) 
        {
            _context = context;
            _mapper = mapper;
            _logService = logService;
            _appSettings = appSettings.Value;
    
        }

      public async Task<ServiceResponse<Object>> RegisterUser(RegisterUserDTO model, string origin, string ipAddress)
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
                account.CartId = Guid.NewGuid();
                account.UserName = model.UserName;
              

                _context.Users.Add(account);

            
             
            
                _context.SaveChanges();

                
             
                 
              
                
                    return new ServiceResponse<Object> { Response = null, Success = true, Message = Messages.Message_RegisterUserSuccess };
            

                //am ramas sa adaug Log service

                try
                {
                    await _logService.LogInfo("Registering applicant user: ", model);
                }
                catch (Exception e)
                {
                    _logService.LogError(e, model);
                }

                
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
        
        public async Task<ServiceResponse<BaseUserDTO>> Authenticate(AuthenticateDTO model, string ipAddress)
        {
            try
            {
                var success = true;
                var account = await _context.Users.SingleOrDefaultAsync(x => x.Email == model.Email);

                var message = Messages.Message_AuthenticateUserSuccess;

                if (account == null | !BC.Verify(model.Password, account.Password))
                {
                    success = false;
                    message = Messages.Message_AuthenticateUserError;
                }

                // authentication successful so generate jwt and refresh tokens
                var jwtToken = generateJwtToken(account);
                var refreshToken = generateRefreshToken(ipAddress);
                account.RefreshTokens.Add(refreshToken);

                // remove old refresh tokens from account
                removeOldRefreshTokens(account);

                // save changes to db




                



             
                _context.Update(account);
                _context.SaveChanges();

                var response = new BaseUserDTO();

                switch (account.UserType)
                {
                    case UserType.Admin:
                        response = _mapper.Map<AdminUserDTO>(account);
                        response.JwtToken = jwtToken;
                        response.RefreshToken = refreshToken.Token;
                        break;
                    case UserType.User:
                        response = _mapper.Map<RegularUserDTO>(account);
                        response.JwtToken = jwtToken;
                        response.RefreshToken = refreshToken.Token;
                        break;
                    default:
                        success = false;
                        message = Messages.Message_LoggedInError;
                        break;
                }

                return new ServiceResponse<BaseUserDTO> { Response = response, Success = success, Message = message };
                

            }catch(Exception e)
            {
                return new ServiceResponse<BaseUserDTO> { Response = null, Success = false, Message = Messages.Message_LoggedInError };
            }
            
        }

        public async Task<ServiceResponse<BaseUserDTO>> RefreshToken(string token, string ipAddress)
        {
            try
            {
                var (refreshToken, account) = await getRefreshToken(token);
                var success = false;
                var message = Messages.Message_RefreshedTokenSuccess;

                // replace old refresh token with a new one and save
                var newRefreshToken = generateRefreshToken(ipAddress);
                refreshToken.Revoked = GenericFunctions.GetCurrentDateTime();
                refreshToken.RevokedByIp = ipAddress;
                refreshToken.ReplacedByToken = newRefreshToken.Token;
                account.RefreshTokens.Add(newRefreshToken);

                _context.Update(account);
                _context.SaveChanges();


                // generate new jwt
                var jwtToken = generateJwtToken(account);

                success = true;

                var response = new BaseUserDTO();

                switch(account.UserType)
                {
                    case UserType.Admin:
                        response = _mapper.Map<AdminUserDTO>(account);
                        response.JwtToken = jwtToken;
                        response.RefreshToken = newRefreshToken.Token;
                        break;
                    case UserType.User:
                        response = _mapper.Map<RegularUserDTO>(account);
                        response.JwtToken = jwtToken;
                        response.RefreshToken = newRefreshToken.Token;
                        break;
                    default:
                        success = false;
                        message = Messages.Message_RefreshedTokenError;
                        break;
                }
                return new ServiceResponse<BaseUserDTO> { Response = response, Success = success, Message = message };
            }
            catch(Exception e)
            {
                return new ServiceResponse<BaseUserDTO> { Response = null, Success = false, Message = Messages.Message_RefreshedTokenError };
            }
        }

        public async Task<ServiceResponse<Object>> RevokeToken(string token, string ipAddress)
        {
            try
            {
                var (refreshToken, account) = await getRefreshToken(token);
                var message = Messages.Message_RevokeTokenSuccess;

                // revoke token and save
                refreshToken.Revoked = GenericFunctions.GetCurrentDateTime();
                refreshToken.RevokedByIp = ipAddress;
                _context.Update(account);
                _context.SaveChanges();

                return new ServiceResponse<Object> { Response = (string)null, Success = true, Message = message };
            }
            catch (Exception e)
            {
                _logService.LogError(e, new { token = token, ipAddress = ipAddress });
                return new ServiceResponse<Object> { Response = (string)null, Success = false, Message = Messages.Message_RevokeTokenError };
            }
        }

        private async Task<(RefreshToken, BaseUser)> getRefreshToken(string token)
        {
            var account = await _context.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));
            if (account == null) throw new AppException("Invalid token");
            var refreshToken = account.RefreshTokens.Single(x => x.Token == token);
            if (!refreshToken.IsActive) throw new AppException("Invalid token");
            return (refreshToken, account);
        }

        private string generateJwtToken(BaseUser account)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", account.UserId.ToString()) }),
                Expires = GenericFunctions.GetCurrentDateTime().AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private RefreshToken generateRefreshToken(string ipAddress)
        {
            return new RefreshToken
            {
                Token = randomTokenString(),
                Expires = GenericFunctions.GetCurrentDateTime().AddDays(7),
                Created = GenericFunctions.GetCurrentDateTime(),
                CreatedByIp = ipAddress
            };
        }

        private string randomTokenString()
        {
            using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var randomBytes = new byte[40];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            // convert random bytes to hex string
            return BitConverter.ToString(randomBytes).Replace("-", "");
        }

        private void removeOldRefreshTokens(BaseUser account)
        {
            account.RefreshTokens.RemoveAll(x =>
                !x.IsActive &&
                x.Created.AddDays(_appSettings.RefreshTokenTTL) <= GenericFunctions.GetCurrentDateTime());
        }

        public async Task<ServiceResponse<RegularUserDTO>> UpdateUser(Guid loggedInUserId, ShippingAddressDTO model)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(x => x.UserId == loggedInUserId);
              _mapper.Map(model, user);

                _context.Users.Update(user);
                _context.SaveChanges();

                var result = _mapper.Map<RegularUserDTO>(user);

                return new ServiceResponse<RegularUserDTO> { Response = result, Success = true, Message = Messages.Message_AddressAddedSuccess };
            }
            catch(Exception e)
            {
                return new ServiceResponse<RegularUserDTO> { Response = null, Success = false, Message = Messages.Message_AddressAddedError };
            }
        }

        public async Task<ServiceResponse<PaginatedUsersDTO>> GetAllUsers(GetUsersFiltersDTO filters)
        {
            try
            {
                if (filters.SearchText == null)
                {
                    filters.SearchText = "";
                }
                   

                var users = new List<BaseUserDTO>();
                users = _mapper.ProjectTo<BaseUserDTO>(_context.Users.Where(x => (x.UserType == UserType.User) && ((x.LastName + " " + x.FirstName).ToLower().Contains(filters.SearchText.ToLower()))
                        ).OrderBy(x => x.FirstName).ThenByDescending(x => x.CreatedAt).Skip(10 * filters.PageNumber).Take(10)).ToList();
                
                

                var rowCount = _mapper.ProjectTo<BaseUserDTO>(_context.Users.Where(x => (x.UserType == UserType.User))).Count();

                var response = new PaginatedUsersDTO
                {
                    RowCount = rowCount,
                    Users = users,
                    
                };
                return new ServiceResponse<PaginatedUsersDTO> { Response = response, Success = true };
            }
            catch (Exception e)
            {
                return new ServiceResponse<PaginatedUsersDTO> { Response = null, Success = false, Message = Messages.Message_UsersLoadError };
            }
     
        }
       
    }
    
    
}


           
