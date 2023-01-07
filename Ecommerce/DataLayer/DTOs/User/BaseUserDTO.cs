using Ecommerce.DataLayer.Utils;
using System;
using System.Text.Json.Serialization;

namespace Ecommerce.DataLayer.DTOs.User
{
    public class BaseUserDTO
    {
        public Guid UserId { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }
        
        public string CreatedAt { get; set; }
        
        public UserType UserType { get; set; }

        public string JwtToken { get; set; }
        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }
    }
}
