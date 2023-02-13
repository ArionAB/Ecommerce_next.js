
using Ecommerce.DataLayer.Models.Cart;
using Ecommerce.DataLayer.Models.Orders;
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


        public Guid CartId { get; set; }

        public CartClass Cart { get; set; }

        public bool OwnsToken(string token)
        {
            return this.RefreshTokens?.Find(x => x.Token == token) != null;
        }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string Info { get; set; }

        public int ZipCode { get; set; }

        public string City { get; set; }

        public string County { get; set; }

        public string Phone { get; set; }

        public string AddressBill { get; set; }

        public string InfoBill { get; set; }

        public int ZipCodeBill { get; set; }

        public string CityBill { get; set; }

        public string CountyBill { get; set; }

        public string PhoneBill { get; set; }

        public string FirstNameBill { get; set; }

        public string LastNameBill { get; set; }

        public List<Order> Orders {get; set;}

    }
}
