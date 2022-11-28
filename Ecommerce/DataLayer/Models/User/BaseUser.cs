using Ecommerce.DataLayer.Utils;
using System;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.Models.User
{
    public abstract class BaseUser
    {
        [Key]
        public Guid UserId { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public DateTime CreatedAt { get; set; }

        public string Password { get; set; }

        public UserType UserType { get; set; }

    }
}
