﻿using AutoMapper;
using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.Models.Baby;
using Ecommerce.DataLayer.Utils;
using Ecommerce.ServiceLayer.FileService;
using Ecommerce.ServiceLayer.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

        public async Task<ServiceResponse<List<BabyDTO>>> GetBabyItems()
        {
            try
            {
                var babyItems = _mapper.ProjectTo<BabyDTO>(_context.Baby).ToList();

                return new ServiceResponse<List<BabyDTO>> { Response = babyItems, Success = true, Message = Messages.Message_GetBabyItemsSuccess };
            }
            catch (Exception e)
            {
                return new ServiceResponse<List<BabyDTO>> { Response = null, Success = false, Message = Messages.Message_GetBabyItemsError };
            }
        }

        public async Task<ServiceResponse<BabyDTO>> GetBabyItem(Guid id)
        {
            try
            {
                if (GenericFunctions.GuidIsNullOrEmpty(id))
                {
                    return new ServiceResponse<BabyDTO> { Response = null, Success = false, Message = Messages.Message_GetBabyItemIdError };
                }

                var babyItem = _mapper.ProjectTo<BabyDTO> (_context.Baby).FirstOrDefault(b => b.BabyId == id);

                return new ServiceResponse<BabyDTO> { Response = babyItem, Success = true, Message = Messages.Message_GetBabyItemSuccess };
            }
            catch (Exception e)
            {
                return new ServiceResponse<BabyDTO> { Response = null, Success = false, Message = Messages.Message_GetBabyItemError };
            }
        }

        public async Task<ServiceResponse<BabyDTO>> UpdateBabyItem(UpdateBabyItemDTO babyitemDTO)
        {
            try
            {
                var babyItem = _context.Baby.FirstOrDefault(x => x.BabyId == babyitemDTO.BabyId);
                //daca foloseam si include el imi adauga si pathurile existente si imi crapa la index

                var simpleBabyItem = _mapper.Map<BabyDTO>(babyItem);

                _mapper.Map(babyitemDTO, babyItem);
                if (babyitemDTO.NewAdditionalPictures != null && babyitemDTO.NewAdditionalPictures.Count > 0)
                {
                    var paths = await _fileService.UploadPictures(babyitemDTO.NewAdditionalPictures, FilePaths.GetAdditionalFilesPaths(babyItem.BabyId));
                    foreach (var file in (babyItem.BabyPictures))
                    {
                        file.FilePath = paths.Response[babyItem.BabyPictures.ToList().IndexOf(file)];
                    }
                }

                if (babyitemDTO.DeletedAdditionalPictures != null && babyitemDTO.DeletedAdditionalPictures.Count > 0)
                    {
                    var pictures = _context.BabyPictures.Where(x => babyitemDTO.DeletedAdditionalPictures.Contains(x.PictureId)).ToList();
                    _context.BabyPictures.RemoveRange(pictures);
                    _fileService.DeleteAdditionalPictures(pictures.Select(x => x.FilePath).ToList());

                }

                _context.Baby.Update(babyItem);

                _context.SaveChanges();

                var result = _mapper.Map<BabyDTO>(babyItem);

                return new ServiceResponse<BabyDTO> { Response = result, Success = true, Message = Messages.Message_UpdateBabyItemSuccess };

            }
            catch (Exception e)
            {
                return new ServiceResponse<BabyDTO> { Response = null, Success = false, Message = Messages.Message_UpdateBabyItemError };
            }
        }

    }
}