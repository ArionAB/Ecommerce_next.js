using Ecommerce.DataLayer.Models.User;

namespace Ecommerce.ServiceLayer.EmailService
{
    public interface IEmailService
    {
        void Send(string to, string subject, string html, string from = null);
        void SendPasswordResetEmail(BaseUser account, string origin);

        void SendAbandonedCartEmail(BaseUser account);

    }
}
