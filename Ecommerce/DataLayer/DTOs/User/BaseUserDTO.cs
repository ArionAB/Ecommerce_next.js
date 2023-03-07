using Ecommerce.DataLayer.Utils;
using System;
using System.Text.Json.Serialization;

namespace Ecommerce.DataLayer.DTOs.User
{
    public class BaseUserDTO
    {
        public Guid UserId { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }
        
        public string CreatedAt { get; set; }
        
        public UserType UserType { get; set; }

        public string JwtToken { get; set; }
        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string Info { get; set; }

        public int ZipCode { get; set; }

        public string City { get; set; }

        public string County { get; set; }

        public string Phone { get; set; }

        public string FirstNameBill { get; set; }

        public string LastNameBill { get; set; }

        public string AddressBill { get; set; }

        public string InfoBill { get; set; }

        public int ZipCodeBill { get; set; }

        public string CityBill { get; set; }

        public string CountyBill { get; set; }

        public string PhoneBill { get; set; }

        public int TotalOrders { get; set; }

        public int MoneySpent { get; set; }
    }
}
