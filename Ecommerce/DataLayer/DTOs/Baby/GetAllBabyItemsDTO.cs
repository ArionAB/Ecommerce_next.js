using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Baby
{
    public class GetAllBabyItemsDTO
    {
        public List<BabyDTO> BabyItems { get; set; }

        public BabyCategoriesDTO TotalItemsPerCategory { get; set; }
    }
}
