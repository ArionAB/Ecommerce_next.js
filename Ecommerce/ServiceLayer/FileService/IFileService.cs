using Ecommerce.DataLayer.Utils;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.FileService
{
    public interface IFileService
    {
        Task<ServiceResponse<List<string>>> UploadPictures(List<IFormFile> pictures, string picturesPath);

        Task<ServiceResponse<Object>> DeleteAdditionalPictures(List<string> additionalPicturesPaths);

        Task<ServiceResponse<Object>> DeleteFile(string filePath);
    }
}
