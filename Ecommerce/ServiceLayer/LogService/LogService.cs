using Ecommerce.ServiceLayer.Utils;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.LogService
{
    public class LogService : ILogService
    {
        private readonly ILogger<LogService> _logger;

        public LogService(ILogger<LogService> logger)
        {
            _logger = logger;
        }

        public async Task LogError(Exception e, Object? obj)
        {
            _logger.LogError(e.ToString() + "\n" + GenericFunctions.SerializeObject(obj));
        }

        public async Task LogError(Exception e)
        {
            _logger.LogError(e.ToString() + "\n");
        }

        public async Task LogInfo(string info)
        {
            _logger.LogInformation(info);
        }

        public async Task LogInfo(string info, object obj)
        {
            _logger.LogInformation(info + "\n" + GenericFunctions.SerializeObject(obj));
        }
    }
}
