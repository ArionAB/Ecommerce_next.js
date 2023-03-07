﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.Models.Orders
{
    public class OrderAddress
    {
        [Key]
        public Guid OrderAddressId { get; set; }

        public Guid OrderId { get; set; }


        public virtual Order Order { get; set; }
        public string Email { get; set; }

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

    }
}
