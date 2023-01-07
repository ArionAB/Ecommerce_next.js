using Ecommerce.DataLayer.Utils;
using Ecommerce.ServiceLayer.Utils;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.FileService.FileSystemService
{
    public class FileSystemService : IFileSystemService
    {
        
        
        public async Task<ServiceResponse<List<string>>> UploadPictures(List<IFormFile> pictures, string directoryPath)

        {
            try
            {
                var response = new List<string>();
                string dirPath = Path.Combine(Directory.GetCurrentDirectory(), "Resources", directoryPath);
                Directory.CreateDirectory(dirPath);

                foreach(var file in pictures)
                {
                    string fileName = GenericFunctions.GetFileNameHashed(file.FileName);
                    var uploadPath = Path.Combine(dirPath, fileName);

                    var stream = new FileStream(uploadPath, FileMode.Create);

                    file.CopyTo(stream);

                    stream.Close();

                    response.Add(Path.Combine(directoryPath, fileName));

                   
                }

                return new ServiceResponse<List<string>> { Response = response, Success = true };



            }

            catch (Exception e)
            {
                return new ServiceResponse<List<string>> { Response = null, Success = false };
            }
        }

        public async Task<ServiceResponse<object>> DeleteAdditionalPictures(List<string> additionalPicturesPaths)
        {
            try
            {
                foreach(var path in additionalPicturesPaths)
                {
                    var deletePath = Path.Combine(Directory.GetCurrentDirectory(), "Resources", path);

                    File.Delete(deletePath);
                }
                return new ServiceResponse<object> { Response = null, Success = true };
            }
            catch (Exception e)
            {
                return new ServiceResponse<object> { Response = null, Success = false };
            }
        }

        public async Task<ServiceResponse<object>> DeleteFile(string filePath)
        {
            try
            {
                var deletePath = Path.Combine(Directory.GetCurrentDirectory(), "Resources", filePath);

                File.Delete(deletePath);
                return new ServiceResponse<object> { Response = true, Success = true };
            }
            catch (Exception e)
            {
            
                return new ServiceResponse<object> { Success = false };
            }
        }

    }
    
    
}
