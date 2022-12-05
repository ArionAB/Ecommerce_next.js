using AutoMapper;
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

                foreach (var item in babyItemDTO.BabySize)
                {
                    
                    if (baby.BabySizes.Where(x => x.Size == item.Size).Count() == 0)
                    {
                        baby.BabySizes.Add(new BabySize { Size = item.Size, Quantity = item.Quantity });
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

        public async Task<ServiceResponse<GetAllBabyItemsDTO>> GetBabyItems()
        {
            try
            {
                var babyItems = _mapper.ProjectTo<BabyDTO>(_context.Baby).ToList();
             


                var counted = new List<BabyDTO>();
              
                var bodysuits = 0;
                var coveralls = 0;

                {
                    foreach (var item in babyItems)
                    {
                       
                        bodysuits = babyItems.Where(x => x.CategoryType == CategoryType.Bodysuit).Count();
                        coveralls = babyItems.Where(x => x.CategoryType == CategoryType.Coverall).Count();

                      
                        counted = _mapper.ProjectTo<BabyDTO>(_context.Baby).ToList();


                    
                    }

                 
                }
                var totalCategory = new BabyCategoriesDTO
                {
                    Bodysuits = bodysuits,
                    Coveralls = coveralls,
                };

                var response = new GetAllBabyItemsDTO
                {
                    BabyItems = counted,
                    TotalItemsPerCategory = totalCategory
                 

                };

                return new ServiceResponse<GetAllBabyItemsDTO> { Response = response, Success = true, Message = Messages.Message_GetBabyItemsSuccess };
            }
            catch (Exception e)
            {
                return new ServiceResponse<GetAllBabyItemsDTO> { Response = null, Success = false, Message = Messages.Message_GetBabyItemsError };
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

                var babyItem = _mapper.ProjectTo<BabyDTO>(_context.Baby).FirstOrDefault(b => b.BabyId == id);

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

        private List<BabyDTO> getBabyItemsFiltered(BabyFiltersDTO filter)
        {
            
            var babyItems = new List<BabyDTO>();

            switch (filter.Category)
            {
                case CategoryType.All:

                    try
                    {


                 
                        babyItems = _mapper.ProjectTo<BabyDTO>(_context.BabySizes.Where(x => filter.BabySize.Contains(x.Size))
                            .Where(x => filter.MinPrice != 0 ? filter.MinPrice <= x.Baby.Price : x.Baby.Price > 0)
                            .Where(x => filter.MaxPrice != 0 ? filter.MaxPrice >= x.Baby.Price : x.Baby.Price > 0)
                            .Take(filter.PageSize)).ToList();
                         
                           
                            

          

             




                    return babyItems;

                    }
                    catch (Exception e)
                    {
                        return babyItems;
                    }
         

                case CategoryType.Bodysuit:
                    babyItems = _mapper.ProjectTo<BabyDTO>(_context.BabySizes
                        .Where(x => x.Baby.CategoryType == CategoryType.Bodysuit)
                        .Where(x => filter.BabySize.Contains(x.Size))
                        .Where(x => filter.MaxPrice != 0 ? filter.MaxPrice >= x.Baby.Price : x.Baby.Price > 0)
                        .Where(x => filter.MinPrice != 0 ? filter.MinPrice <= x.Baby.Price : x.Baby.Price > 0)
                        .Take(filter.PageSize)).ToList();

                    return babyItems;
                    
                case CategoryType.Coverall:
                    babyItems = _mapper.ProjectTo<BabyDTO>(_context.BabySizes
                        .Where(x => x.Baby.CategoryType == CategoryType.Coverall)
                        .Where(x => filter.BabySize.Contains(x.Size))
                        .Where(x => filter.MaxPrice != 0 ? filter.MaxPrice >= x.Baby.Price : x.Baby.Price > 0)
                        .Where(x => filter.MinPrice != 0 ? filter.MinPrice <= x.Baby.Price : x.Baby.Price > 0)
                        .Take(filter.PageSize)).ToList();
                                
                                


                    return babyItems;
           
            }

            return babyItems;
           
            
        }

        public async Task<ServiceResponse<PaginatedBabyItemsDTO>> GetPaginatedBabyItems(BabyFiltersDTO filters)
        {
            try
            {
                var babyItems = getBabyItemsFiltered(filters);
                var baby = _context.Baby;
                var counted = new List<BabyDTO>();
                

                {
                    foreach (var item in babyItems)
                    {
                       
                        var totalItemsPerCategory = babyItems.Where(x => x.CategoryType == item.CategoryType).Count();

                        var totalItemsPerSize = item.BabySizes.Count();
                      
                      



                        counted.Add(new BabyDTO
                        {
                            BabyId = item.BabyId,
                            CategoryType = item.CategoryType,
                            Description = item.Description,
                            Title = item.Title,
                            Price = item.Price,
                            BabyPictures = item.BabyPictures,
                            BabySizes = item.BabySizes,
                            TotalCategoryItems = totalItemsPerCategory,
                            TotalSize = totalItemsPerSize
                       
                        });
                    }
                }

                var totalRecords = _context.Baby

                     .Where(x => filters.MinPrice <= x.Price)
                     .Where(x => filters.MaxPrice >= x.Price).Count();
                     //.Where(x => filters.BabySize[0] != 0 ? filters.BabySize.Count == 0 || filters.BabySize.Contains(x.BabySize) : true).Count();

                var totalPages = totalRecords / filters.PageSize;
                if (totalRecords == filters.PageSize) totalPages--;

                var response = new PaginatedBabyItemsDTO
                {
                    BabyItems = counted,
                    TotalPages = totalPages,
                    CurrentPageNumber = filters.PageNumber,
                    TotalItems = totalRecords
                    
                };

                return new ServiceResponse<PaginatedBabyItemsDTO> { Response = response, Success = true };
            }
            catch(Exception e)
            {
                return new ServiceResponse<PaginatedBabyItemsDTO> { Response = null, Success = false, Message = Messages.Message_GetPaginatedBabyItemsError };
            }
        }







    }
    
}
