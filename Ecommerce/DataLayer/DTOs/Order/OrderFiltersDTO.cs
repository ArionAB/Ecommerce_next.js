using Ecommerce.DataLayer.Utils;

namespace Ecommerce.DataLayer.DTOs.Order
{
    public class OrderFiltersDTO
    {
        
        public int PageNumber { get; set; }
        public OrderSortBy OrderToSortBy { get; set; }

        public bool SortingOrder { get; set; }

        public string SearchText { get; set; }

        public string FirstEntryDate { get; set; }
        
        public string SecondEntryDate { get; set; }

        public OrderStatusType Status { get; set; }

    }
}
