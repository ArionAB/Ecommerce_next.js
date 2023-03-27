using MimeKit;

namespace Ecommerce.DataLayer.DTOs.Email
{
    public class EmailsInQueueDTO
    {
        public MimeMessage Email { get; set; }
        public int TryCount { get; set; }

        public EmailsInQueueDTO(MimeMessage email)
        {
            Email = email;
            TryCount = 5;
        }
    }
}
