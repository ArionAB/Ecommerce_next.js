using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.User
{
    public class PaginatedUsersDTO
    {
        public int RowCount { get; set; }
        public List<BaseUserDTO> Users { get; set; }
    }
}
