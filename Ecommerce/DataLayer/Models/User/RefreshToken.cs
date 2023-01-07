using Ecommerce.DataLayer.Models.User;
using Ecommerce.ServiceLayer.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.Utils
{
    [Owned]
    public class RefreshToken
    {
        [Key]
        public Guid Id { get; set; }
        public BaseUser Account { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; }
        public bool IsExpired => GenericFunctions.GetCurrentDateTime() >= Expires;
        public DateTime Created { get; set; }
        public string CreatedByIp { get; set; }
        public DateTime? Revoked { get; set; }
        public string RevokedByIp { get; set; }
        public string ReplacedByToken { get; set; }
        public bool IsActive => Revoked == null && !IsExpired;
    }
}
