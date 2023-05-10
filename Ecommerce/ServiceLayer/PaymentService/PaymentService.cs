using AutoMapper;
using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.DTOs.Payment;
using Ecommerce.DataLayer.Utils;
using Ecommerce.ServiceLayer.FileService;
using Ecommerce.ServiceLayer.LogService;
using Ecommerce.ServiceLayer.Utils;
using Microsoft.Extensions.Options;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using MobilpayEncryptDecrypt;

namespace Ecommerce.ServiceLayer.PaymentService
{
    public class PaymentService : IPaymentService
    {
        private readonly MainDbContext _context;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;

        public PaymentService(MainDbContext context, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _mapper = mapper;
            _appSettings = appSettings.Value;
       
    
        }

        public async Task<ServiceResponse<RequestPaymentDTO>> GoToPayment(GoToPaymentDTO paymentDTO, string origin)
        {
            try
            {
                var userType = _context.Users.Where(x => x.UserId == paymentDTO.UserId).FirstOrDefault();
                MobilpayEncrypt encrypt = new MobilpayEncrypt();

                Mobilpay_Payment_Request_Card card = new Mobilpay_Payment_Request_Card();
                Mobilpay_Payment_Invoice invoice = new Mobilpay_Payment_Invoice();
                Mobilpay_Payment_Address billing = new Mobilpay_Payment_Address();
                Mobilpay_Payment_Request_Contact_Info ctinfo = new Mobilpay_Payment_Request_Contact_Info();
                Mobilpay_Payment_Request_Url url = new Mobilpay_Payment_Request_Url();
                Mobilpay_Payment_Params userId = new Mobilpay_Payment_Params();
                Mobilpay_Payment_Params paymentType = new Mobilpay_Payment_Params();

                userId.Name = "userId";
                userId.Value = paymentDTO.UserId.ToString();

                paymentType.Name = "paymentType";
                paymentType.Value = paymentDTO.PaymentType.ToString();

                MobilpayEncryptDecrypt.MobilpayEncryptDecrypt encdecr = new MobilpayEncryptDecrypt.MobilpayEncryptDecrypt();

                card.OrderId = Guid.NewGuid().ToString();
                card.Type = "card";
                card.Signature = _appSettings.NetopiaSignature;
                card.Params = new Mobilpay_Payment_ParamsCollection();

                card.Params.Add(userId);
                card.Params.Add(paymentType);

                url.ConfirmUrl = origin + "/Payment/AddOrUpdatePayment";
                url.ReturnUrl = _appSettings.MailBaseUrl + "/plata";

                card.Service = "";
                card.Url = url;
                card.TimeStamp = GenericFunctions.GetCurrentDateTime().ToString("yyyyMMddhhmmss");

                invoice.Amount = 300;
                invoice.Currency = "RON";
                invoice.Details = "detalii plata";

                //if (userType == UserType.CompanyUser) billing.Type = "company";
                //if (userType == UserType.ApplicantUser) billing.Type = "person";
                billing.Type = "person";
                billing.Email = paymentDTO.Email;


                ctinfo.Billing = billing;

                invoice.ContactInfo = ctinfo;


                card.Invoice = invoice;
                encrypt.Data = encdecr.GetXmlText(card);
                encrypt.X509CertificateFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Resources/public.cer");
                encdecr.Encrypt(encrypt);
                System.Collections.Specialized.NameValueCollection coll = new System.Collections.Specialized.NameValueCollection();
                coll.Add("data", encrypt.EncryptedData);
                coll.Add("env_key", encrypt.EnvelopeKey);

                var response = new RequestPaymentDTO
                {
                    Env_Key = coll["env_key"],
                    Data = coll["data"],
                    Url = _appSettings.NetopiaUrl,
                    PaymentType = paymentDTO.PaymentType
                };

                return new ServiceResponse<RequestPaymentDTO> { Response = response, Success = true };
            }
            catch (Exception e)
            {
             
                return new ServiceResponse<RequestPaymentDTO> { Success = false, Message = Messages.Message_PaymentServiceNotAvailable };
            }
        }

    }
}
