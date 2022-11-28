using System;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.LogService
{
    public interface ILogService
    {
        Task LogError(Exception e, Object obj);

        Task LogError(Exception e);

        Task LogInfo(string info);

        Task LogInfo(string info, Object obj);
        
        
    }
}
