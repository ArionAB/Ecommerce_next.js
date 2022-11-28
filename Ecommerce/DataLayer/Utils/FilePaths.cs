using System;

namespace Ecommerce.DataLayer.Utils
{
    public class FilePaths
    {

        public static string GetAdditionalFilesPaths(Guid userId)
        {
            return userId + "\\additionalFiles";
        }
    }
}
