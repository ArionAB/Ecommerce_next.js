using Ecommerce.DataLayer.Utils;
using Ecommerce.ServiceLayer.FileService.FileSystemService;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.FileService
{
    public class FileService : IFileService
    {

        private readonly IFileSystemService _fileService;

        public FileService(IFileSystemService fileService)
        {
            _fileService = fileService;
        }

        public async Task<ServiceResponse<List<string>>> UploadPictures(List<IFormFile> pictures, string filesPath)
        {
            return await _fileService.UploadPictures(pictures, filesPath);
        }
    }
}
