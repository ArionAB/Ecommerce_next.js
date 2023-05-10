using System;

namespace Ecommerce.DataLayer.DTOs.Payment
{
    public class GoToPaymentDTO
    {
        public Guid UserId { get; set; }
        //public PaymentType PaymentType { get; set; }

        public int PaymentType { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        //public int InvoiceAmount { get; set; }
    }
}
