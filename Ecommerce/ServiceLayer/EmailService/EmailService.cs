using Ecommerce.DataLayer.DTOs.Email;
using Ecommerce.DataLayer.Utils;
using Ecommerce.ServiceLayer.LogService;
using Microsoft.Extensions.Options;
using MimeKit.Text;
using MimeKit;
using System.Collections.Generic;
using MailKit.Security;
using System.Threading;
using System;
using MailKit.Net.Smtp;
using Ecommerce.DataLayer.Models.User;

namespace Ecommerce.ServiceLayer.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly AppSettings _appSettings;
        private Queue<EmailsInQueueDTO> _emailsQueue = new Queue<EmailsInQueueDTO>();

        public EmailService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
         
        }

        private string GetMailTemplate(string title, string content)
        {
            string mailHtml = $@"<!DOCTYPE html>
                        <html>
                        <body style=""text-align:center ;padding: 20px;background:#7367f0;color:white"">
                         <div>
                            <div style=""display:flex;text-align:center;background:#7367f0;align-items:center"">
                            <div style=""width:33%;display:flex;"">
                            <img height=""50"" width=""50%"" src=""https://smisrecruitingfiles.file.core.windows.net/smis-recruiting-helper-files/Documente%20template/cei_smart.png?sv=2020-10-02&st=2023-02-07T08%3A07%3A55Z&se=2026-11-08T08%3A07%3A00Z&sr=f&sp=r&sig=6HRpxHYrFvtdhVbx1pm%2FRo%2BcTO83vUeTfI2ikDr1wDo%3D"" />
                            <img height=""50"" width=""50%"" src=""https://smisrecruitingfiles.file.core.windows.net/smis-recruiting-helper-files/Documente%20template/logo-xerom-contact.png?sv=2020-10-02&st=2023-02-07T08%3A08%3A17Z&se=2025-10-08T07%3A08%3A00Z&sr=f&sp=r&sig=kLuNJJlmT7rdrq3xHmPrHV34CHBXOa5df2rS0Lb7ykQ%3D"" />
                            </div>
                            <div style=""width:38%;display:flex;text-align:center;padding:5px;"">
                            <p style=""width:100%;color:white;font-size:medium"">Susținem antreprenoriatul social în mediul rural</p>
                            </div>
                            <div style=""width:27%;"">
                            <img height=""50"" width=""50%"" src=""https://smisrecruitingfiles.file.core.windows.net/smis-recruiting-helper-files/Documente%20template/logo_smis.png?sv=2020-10-02&st=2023-02-07T08%3A08%3A37Z&se=2025-10-08T07%3A08%3A00Z&sr=f&sp=r&sig=tSJxwb84qGAmuKcY7uYHvzmEtM8%2BSAvl5JZzlhFE3Zk%3D"" />
                            </div>                           
                            </div>
                            <div style=""text-align:center;"">
                               <h1> {title} </h1>
                            <div style=""padding-bottom: 20px; font-size:1.8em "" > {content} </div>
                            </div>
                            <div style=""text-align:center; margin-top:15px; display:flex;background:#7367f0;"">
                            <div style=""width:50%"">
                            <img style=""margin: 1px;"" max-width=""25%"" height=""50"" src=""https://smisrecruitingfiles.file.core.windows.net/smis-recruiting-helper-files/Documente%20template/pocu.png?sv=2020-10-02&st=2023-02-07T08%3A06%3A41Z&se=2026-11-08T08%3A06%3A00Z&sr=f&sp=r&sig=k1W3crUouF1XmRkOiSIFqffWH26JugLCYT7eXoWOJRE%3D"" />
                            </div>
                            <div style=""width:50%"">
                            <img style=""margin: 1px;"" max-width=""25%"" height=""50"" src=""https://smisrecruitingfiles.file.core.windows.net/smis-recruiting-helper-files/Documente%20template/instrumente-structurale.png?sv=2020-10-02&st=2023-02-07T08%3A07%3A33Z&se=2026-10-08T07%3A07%3A00Z&sr=f&sp=r&sig=CJwVPtWdrXN%2BIPzOJ4TPGMI0hAfxwBLJUb5xz5WqUIE%3D"" />
                            </div> 
                            </div>
                         </div >
                        </body>
                        </html> ";

            return mailHtml;
        }

        public async void Send(string to, string subject, string html, string from = null)
        {
            // create message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(from ?? _appSettings.EmailFrom));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = html };

            _emailsQueue.Enqueue(new EmailsInQueueDTO(email));
            // send emails
            if (_emailsQueue.Count == 1)
            {
                SendQueueEmails();
            }

        }

        public async void SendQueueEmails()
        {
            using var smtp = new SmtpClient();
            smtp.Connect(_appSettings.SmtpHost, _appSettings.SmtpPort, SecureSocketOptions.StartTls);
            smtp.Authenticate(_appSettings.SmtpUser, _appSettings.SmtpPass);
            while (_emailsQueue.Count > 0)
            {
                var emailQueue = _emailsQueue.Dequeue();
                emailQueue.TryCount--;
                try
                {
                    smtp.Send(emailQueue.Email);
                }
                catch (Exception e)
                {
                    Thread.Sleep(1000);
                    if (emailQueue.TryCount > 0)
                    {
                        _emailsQueue.Enqueue(emailQueue);
                    }
                  

                }
            }
            smtp.Disconnect(true);

        }

        public async void SendPasswordResetEmail(BaseUser account, string origin)
        {
            string message;
            origin = _appSettings.MailBaseUrl;
            if (!string.IsNullOrEmpty(origin))
            {
                var resetUrl = $"{origin}/resetare-parola/token={account.ResetToken}";
                message = $@"<p>Apăsați pe link-ul de mai jos pentru a reseta parola. Link-ul e valabil 24 de ore de la primire</p>
                             <p><a href=""{resetUrl}"">Resetează parola</a></p>";
            }
            else
            {
                message = $@"<p>Vă rugăm contactați un expert din cadrul proiectului cu token-ul de mai jos, pentru resetarea parolei</p>
                             <p><code>{account.ResetToken}</code></p>";
            }
            var html = GetMailTemplate("Verificare resetare parola", $@"{message}");
            Send(
                to: account.Email,
                subject: "Henig Honig: Verificare resetare parola",
                html: html
            );
        }

        public async void SendAbandonedCartEmail(BaseUser account)
        {
            string message;
            var origin = _appSettings.MailBaseUrl;
            var cartUrl = $"{origin}/cart";
            message = $@"<div><h1>ÎNCĂ TE MAI GÂNDEȘTI?<h1>
                        <p>Se pare că ai uitat câteva produse în coșul de cumpărături. Grăbeşte-te, stocurile se epuizează repede!<p/>
                     
                        <p>Şi nu uita, poţi comanda chiar azi produsele de care ai nevoie!</p>
                        <h6><a href=""{cartUrl}""> Continua cumparaturile </a></h6></div>";

            var html = GetMailTemplate("Coș abandonat", $@"{message}");
            Send(
                to: account.Email,
                subject: "Henig Honig: Coș abandonat!",
                html: html
                );

            
        }
    }
}
