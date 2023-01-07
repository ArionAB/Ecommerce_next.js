using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly AppSettings _appSettings;
        

        public JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
        {
            _next = next;
            _appSettings = appSettings.Value;
           
        }

        public async Task Invoke(HttpContext context, MainDbContext dataContext)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                await attachAccountToContext(context, dataContext, token);
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                context.Response.Clear();
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Eroare server!");
              
            }

        }

        private async Task attachAccountToContext(HttpContext context, MainDbContext dataContext, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var accountId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

                // attach account to context on successful jwt validation
                context.Items["User"] = await dataContext.Users.FindAsync(accountId);
            }
            catch
            {
                // do nothing if jwt validation fails
                // account is not attached to context so request won't have access to secure routes
            }
        }
    }
}
