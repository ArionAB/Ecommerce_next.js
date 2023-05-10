namespace Ecommerce.DataLayer.DTOs.Payment
{
    public class RequestPaymentDTO
    {
        public string Env_Key { get; set; }
        public string Data { get; set; }
        public string Url { get; set; }

        public int PaymentType { get; set; }
        //public PaymentType PaymentType { get; set; }
    }
}
