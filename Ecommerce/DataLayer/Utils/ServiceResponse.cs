namespace Ecommerce.DataLayer.Utils
{
    public class ServiceResponse<T>
    {
        public T Response { get; set; }
        
        public bool Success { get; set; }

        public Message Message { get; set; }
    }
}
