using AutoMapper;
using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.Models.Baby;
using Ecommerce.DataLayer.Utils;
using Ecommerce.ServiceLayer.FileService;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.BabyService
{
    public class BabyService : IBabyService
    {
        private readonly MainDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public BabyService(MainDbContext context, IMapper mapper, IFileService fileService)
        {
            _context = context;
            _mapper = mapper;
            _fileService = fileService;
        }

        public async Task<ServiceResponse<Object>> AddBabyItem(AddBabyItemDTO babyItemDTO)
        {
           
            try
            {
                var baby = _mapper.Map<BabyClass>(babyItemDTO);
                await _context.Baby.AddAsync(baby);

                if (babyItemDTO.Pictures != null && babyItemDTO.Pictures.Count > 0)
                {

                    var paths = await _fileService.UploadPictures(babyItemDTO.Pictures, FilePaths.GetAdditionalFilesPaths(baby.BabyId));

                   if (!paths.Success)
                    {
                        return new ServiceResponse<Object> { Response = (string)null, Success = false, Message = Messages.Message_UploadPictureSuccess };
                    }
                   
                    //foreach (var file in bodysuit.Pictures)
                        foreach (var file in baby.BabyPictures)
                        {
                        file.FilePath = paths.Response[baby.BabyPictures.ToList().IndexOf(file)];
                    }

                  
                }
                
               //save bodysuit
                 _context.SaveChanges();

                return new ServiceResponse<Object> { Response = (string)null, Success = true, Message = Messages.Message_UploadPictureSuccess };

            }
            catch (Exception e)
            {
                return new ServiceResponse<Object> { Response = (string)null, Success = false, Message = Messages.Message_UploadPictureError };
            }
           
        }

       
    }
}
