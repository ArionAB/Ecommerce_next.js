using Ecommerce.DataLayer.Utils;
using System;

namespace Ecommerce.DataLayer.DTOs.User
{
    public class BaseUserDTO
    {
        public Guid UserId { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }
        
        public string CreatedAt { get; set; }
        
        public UserType UserType { get; set; }
    }
}
