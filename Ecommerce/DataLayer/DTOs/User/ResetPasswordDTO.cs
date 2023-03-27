using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.DTOs.User
{
    public class ResetPasswordDTO
    {
            
        [Required]
        public string Token { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}

