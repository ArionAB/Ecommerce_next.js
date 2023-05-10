using Ecommerce.DataLayer.DTOs.Payment;
using Ecommerce.ServiceLayer.PaymentService;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Ecommerce.Controllers
{
    public class PaymentController : BaseController
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("/Payment/GoToPayment")]
        public async Task<IActionResult> GoToPayment([FromBody] GoToPaymentDTO payment)
        {
            var origin = Request.Scheme + "://" + Request.Host;

            var paymentDTO = new GoToPaymentDTO
            {
                UserId = Account.UserId,
                PaymentType = payment.PaymentType,
                //InvoiceAmount = payment.InvoiceAmount,
            };

            var result = await _paymentService.GoToPayment(paymentDTO, origin);

            if (result.Success)
                return Ok(result);
            else
                return BadRequest(result);

        }
    }
}
