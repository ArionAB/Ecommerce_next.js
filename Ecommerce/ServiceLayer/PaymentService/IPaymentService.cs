using Ecommerce.DataLayer.DTOs.Payment;
using Ecommerce.DataLayer.Utils;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.PaymentService
{
    public interface IPaymentService
    {
        Task<ServiceResponse<RequestPaymentDTO>> GoToPayment(GoToPaymentDTO paymentDTO, string origin);
    }
}
