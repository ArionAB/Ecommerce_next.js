using Ecommerce.DataLayer.Models.Baby;
using Ecommerce.DataLayer.Models.Cart;
using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;
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

        public List<RefreshToken> RefreshTokens { get; set; }

        public List<CartClass> Carts { get; set; }

        public bool OwnsToken(string token)
        {
            return this.RefreshTokens?.Find(x => x.Token == token) != null;
        }

    }
}
