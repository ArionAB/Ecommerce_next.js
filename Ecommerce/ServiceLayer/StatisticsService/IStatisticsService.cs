using Ecommerce.DataLayer.Utils;
using System;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.StatisticsService
{
    public interface IStatisticsService
    {
        Task<ServiceResponse<Object>> GetStatistics(UserType userType);
    }
}
