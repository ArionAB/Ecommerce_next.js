using AutoMapper;
using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.Models.Baby.Bodysuits;
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

        public async Task<ServiceResponse<Object>> Addbodysuit(AddBodysuitDTO bodysuitDTO)
        {
           
            try
            {
                var bodysuit = _mapper.Map<Bodysuit>(bodysuitDTO);
                await _context.Bodysuits.AddAsync(bodysuit);

                if (bodysuitDTO.Pictures != null && bodysuitDTO.Pictures.Count > 0)
                {

                    var paths = await _fileService.UploadPictures(bodysuitDTO.Pictures, FilePaths.GetAdditionalFilesPaths(bodysuit.BodysuitsId));

                   if (!paths.Success)
                    {
                        return new ServiceResponse<Object> { Response = (string)null, Success = false, Message = Messages.Message_UploadPictureSuccess };
                    }
                   
                    //foreach (var file in bodysuit.Pictures)
                        foreach (var file in bodysuit.BodysuitPictures)
                        {
                        file.FilePath = paths.Response[bodysuit.BodysuitPictures.ToList().IndexOf(file)];
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

        public async Task<ServiceResponse<Object>> AddCoverall(AddCoverallsDTO coverallDTO)
        {
            
            try
            {
                var coverall = _mapper.Map<Bodysuit>(coverallDTO);
                await _context.Bodysuits.AddAsync(coverall);

                if (coverallDTO.Pictures != null && coverallDTO.Pictures.Count > 0)
                {

                    var paths = await _fileService.UploadPictures(coverallDTO.Pictures, FilePaths.GetAdditionalFilesPaths(coverall.BodysuitsId));

                    if (!paths.Success)
                    {
                        return new ServiceResponse<Object> { Response = (string)null, Success = false, Message = Messages.Message_UploadPictureSuccess };
                    }

                    //foreach (var file in bodysuit.Pictures)
                    foreach (var file in coverall.BodysuitPictures)
                    {
                        file.FilePath = paths.Response[coverall.BodysuitPictures.ToList().IndexOf(file)];
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
