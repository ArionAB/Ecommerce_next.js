using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataLayer.DTOs.User
{
    public class RegisterAdminDTO
    {
        [Required]
        [EmailAddress]

        public string Email { get; set; }

        [Required]

        public string Password { get; set; }

        [Required]

        public string ConfirmPassword { get; set; }
    }
}
