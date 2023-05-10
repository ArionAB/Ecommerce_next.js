using System;
using System.Collections.Generic;

namespace Ecommerce.DataLayer.DTOs.Statistics
{
    public class StatisticsDTO
    {
        public int AverageOrderValue { get; set; }

        public int AbandonedCartRate { get; set; }

        public List<Object> MostSoldHoneyType { get; set; }

        public List<Object> MostSoldSizeType { get; set; }

        public List<Object> MostSoldFruitType { get; set; }

        public List<Object> SalesPerMonth { get; set; }

        public int CustomerRetentionRate { get; set; }

        public List<Object> ProductSales { get; set; }
    }
}
