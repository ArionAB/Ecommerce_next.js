using Ecommerce.DataLayer.Utils;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.FileService.FileSystemService
{
    public interface IFileSystemService
    {
        Task<ServiceResponse<List<string>>> UploadPictures(List<IFormFile> pictures, string directoryPath);

        Task<ServiceResponse<Object>> DeleteAdditionalPictures(List<string> additionalPicturesPaths);
    }
}
