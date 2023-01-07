using AutoMapper;
using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.DTOs.Baby;
using Ecommerce.DataLayer.DTOs.Product;
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
    public class ProductService : IProductService
    {
        private readonly MainDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public ProductService(MainDbContext context, IMapper mapper, IFileService fileService)
        {
            _context = context;
            _mapper = mapper;
            _fileService = fileService;
        }

        public async Task<ServiceResponse<Object>> AddProductItem(AddProductItemDTO productDTO)
        {

            try
            {
                var product = _mapper.Map<ProductClass>(productDTO);
                await _context.Product.AddAsync(product);

                if (productDTO.Pictures != null && productDTO.Pictures.Count > 0)
                {

                    var paths = await _fileService.UploadPictures(productDTO.Pictures, FilePaths.GetAdditionalFilesPaths(product.ProductId));

                    if (!paths.Success)
                    {
                        return new ServiceResponse<Object> { Response = (string)null, Success = false, Message = Messages.Message_UploadPictureSuccess };
                    }

                    //foreach (var file in bodysuit.Pictures)
                    foreach (var file in product.ProductPictures)
                    {
                        file.FilePath = paths.Response[product.ProductPictures.ToList().IndexOf(file)];
                    }


                }

                foreach (var item in productDTO.ProductSize)
                {
                    
                    if (product.ProductSizes.Where(x => x.Size == item.Size).Count() == 0)
                    {
                        product.ProductSizes.Add(new ProductSize { Size = item.Size, Quantity = item.Quantity });
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

        public async Task<ServiceResponse<GetAllProductsDTO>> GetProductItems(string SearchText)
        {
            try
            {
                var totalItems = await _context.Product.CountAsync();
                var productItems = _mapper.ProjectTo<ProductDTO>(_context.Product.Where(x => !String.IsNullOrWhiteSpace(SearchText)? (x.Title + x.Description).Contains(SearchText):true)).ToList();
             

         
                       
                       var bodysuits = productItems.Where(x => x.SubcategoryType == SubcategoryType.Bodysuit).Count();
                       var coveralls = productItems.Where(x => x.SubcategoryType == SubcategoryType.Coverall).Count();
                       var zeroToThree = productItems.Where(x => x.ProductSizes.Where(y => y.Size == GenericFunctions.ConvertBabySizeEnumToString(BabySizeType.ZeroToThree)).Any()).Count();
                       var threeToSix = productItems.Where(x => x.ProductSizes.Where(y => y.Size == GenericFunctions.ConvertBabySizeEnumToString(BabySizeType.ThreeToSix)).Any()).Count();
                       var sixToNine = productItems.Where(x => x.ProductSizes.Where(y => y.Size == GenericFunctions.ConvertBabySizeEnumToString(BabySizeType.SixToNine)).Any()).Count();
                       var nineToTwelve = productItems.Where(x => x.ProductSizes.Where(y => y.Size == GenericFunctions.ConvertBabySizeEnumToString(BabySizeType.NineToTwelve)).Any()).Count();
                       var twelveToEighteen = productItems.Where(x => x.ProductSizes.Where(y => y.Size == GenericFunctions.ConvertBabySizeEnumToString(BabySizeType.TwelveToEighteen)).Any()).Count();
                       var eighteenToTwentyFour = productItems.Where(x => x.ProductSizes.Where(y => y.Size == GenericFunctions.ConvertBabySizeEnumToString(BabySizeType.EighteenToTwentyFour)).Any()).Count();
                       var minPirce = productItems.Min(x => x.Price);
                       var maxPrice = productItems.Max(x => x.Price);
                       var totalSearchResultItems = productItems.Count();


                var priceRange = new ProductPriceDTO
                {
                    MinPrice = minPirce,
                    MaxPrice = maxPrice
                };
            


                var totalCategory = new BabyCategoriesDTO
                {
                    Bodysuits = bodysuits,
                    Coveralls = coveralls,
                };

                var totalSizes = new ProductSizesEnumDTO
                {
                    ZeroToThree = zeroToThree,
                    ThreeToSix = threeToSix,
                    SixToNine = sixToNine,
                    NineToTwelve = nineToTwelve,
                    TwelveToEighteen = twelveToEighteen,
                    EighteenToTwentyFour = eighteenToTwentyFour
                };

                var response = new GetAllProductsDTO
                {
                    ProductItems = productItems,
                    TotalItemsPerCategory = totalCategory,
                    TotalSizes = totalSizes,
                    PriceRange = priceRange,
                    TotalSearchResultItems = totalSearchResultItems,
                    TotalItems = totalItems


                };

                return new ServiceResponse<GetAllProductsDTO> { Response = response, Success = true, Message = Messages.Message_GetBabyItemsSuccess };
            }
            catch (Exception e)
            {
                return new ServiceResponse<GetAllProductsDTO> { Response = null, Success = false, Message = Messages.Message_GetBabyItemsError };
            }
        }

        public async Task<ServiceResponse<ProductDTO>> GetProductItem(Guid id)
        {
            try
            {
                if (GenericFunctions.GuidIsNullOrEmpty(id))
                {
                    return new ServiceResponse<ProductDTO> { Response = null, Success = false, Message = Messages.Message_GetBabyItemIdError };
                }
                
                var babyItem = _mapper.ProjectTo<ProductDTO>(_context.Product).FirstOrDefault(b => b.ProductId == id);

                return new ServiceResponse<ProductDTO> { Response = babyItem, Success = true, Message = Messages.Message_GetBabyItemSuccess };
            }
            catch (Exception e)
            {
                return new ServiceResponse<ProductDTO> { Response = null, Success = false, Message = Messages.Message_GetBabyItemError };
            }
        }

        public async Task<ServiceResponse<ProductDTO>> UpdateProductItem(UpdateProductItemDTO updateDTO)
        {
            try
            {
                var productItem = _context.Product.FirstOrDefault(x => x.ProductId == updateDTO.ProductId);
                //daca foloseam si include el imi adauga si pathurile existente si imi crapa la index

                var simpleBabyItem = _mapper.Map<ProductDTO>(productItem);

                _mapper.Map(updateDTO, productItem);
                if (updateDTO.NewAdditionalPictures != null && updateDTO.NewAdditionalPictures.Count > 0)
                {
                    var paths = await _fileService.UploadPictures(updateDTO.NewAdditionalPictures, FilePaths.GetAdditionalFilesPaths(productItem.ProductId));
                    foreach (var file in (productItem.ProductPictures))
                    {
                        file.FilePath = paths.Response[productItem.ProductPictures.ToList().IndexOf(file)];
                    }
                }

                if (updateDTO.DeletedAdditionalPictures != null && updateDTO.DeletedAdditionalPictures.Count > 0)
                {
                    var pictures = _context.ProductPictures.Where(x => updateDTO.DeletedAdditionalPictures.Contains(x.PictureId)).ToList();
                    _context.ProductPictures.RemoveRange(pictures);
                    _fileService.DeleteAdditionalPictures(pictures.Select(x => x.FilePath).ToList());

                }

                _context.Product.Update(productItem);

                _context.SaveChanges();

                var result = _mapper.Map<ProductDTO>(productItem);

                return new ServiceResponse<ProductDTO> { Response = result, Success = true, Message = Messages.Message_UpdateBabyItemSuccess };

            }
            catch (Exception e)
            {
                return new ServiceResponse<ProductDTO> { Response = null, Success = false, Message = Messages.Message_UpdateBabyItemError };
            }
        }

        public async Task<ServiceResponse<object>> DeleteProduct(Guid id)
        {
            try
            {
                if (GenericFunctions.GuidIsNullOrEmpty(id))
                {
                    return new ServiceResponse<object> { Response = null, Success = false, Message = Messages.Message_DeleteProductIdError };
                }

                var productItem = _context.Product.FirstOrDefault(x => x.ProductId == id);
                if (productItem == null)
                {
                    return new ServiceResponse<object> { Response = null, Success = false, Message = Messages.Message_DeleteProductError };
                }

                _context.Product.Remove(productItem);
                _context.SaveChanges();

                if (productItem.ProductPictures != null)
                {
                    foreach (var item in productItem.ProductPictures)
                    {

                        _fileService.DeleteFile(item.FilePath);

                    }
                }
              
            

                return new ServiceResponse<object> { Response = null, Success = true, Message = Messages.Message_DeleteProductSuccess };
            }
            catch (Exception e)
            {
                return new ServiceResponse<object> { Response = null, Success = false, Message = Messages.Message_DeleteProductGeneralError };
            }
        }

        private List<ProductDTO> getBabyItemsFiltered(ProductFiltersDTO filter)
        {
            
            var productItems = new List<ProductDTO>();
            
            switch(filter.ProductCategory)
            {
                case ProductCategoryType.Baby:
                    productItems = _mapper.ProjectTo<ProductDTO>(_context.Product).Where(x => x.ProductCategory == ProductCategoryType.Baby).ToList();
                    break;
                case ProductCategoryType.All:
                    productItems = _mapper.ProjectTo<ProductDTO>(_context.Product).ToList();
                    break;

            }

            switch (filter.SubcategoryType)
            {
                case SubcategoryType.All:

                    try
                    {



                        //babyItems = babyItems.Where(x => x.ProductSizes.Where(x => filter.ProductSize.Contains(x.Size)).Count() > 0)
                        productItems = productItems.Where(x => x.ProductSizes.Where(x => filter.ProductSize != null ? filter.ProductSize.Contains(x.Size) : productItems.Any()).Count() > 0)
                        .Where(x => filter.MaxPrice != 0 ? filter.MaxPrice >= x.Price : x.Price > 0)
                        .Where(x => filter.MinPrice != 0 ? filter.MinPrice <= x.Price : x.Price > 0)
                       .Take(filter.PageSize).ToList();
                      










                        return productItems;

                    }
                    catch (Exception e)
                    {
                        return productItems;
                    }
         

                case SubcategoryType.Bodysuit:
                    //babyItems = babyItems.Where(x => x.ProductSizes.Where(x => filter.ProductSize.Contains(x.Size)).Count() > 0)
                    productItems = productItems.Where(x => x.ProductSizes.Where(x => filter.ProductSize != null ? filter.ProductSize.Contains(x.Size) : productItems.Any()).Count() > 0)

.Where(x => x.SubcategoryType == SubcategoryType.Bodysuit)
                        .Where(x => filter.MaxPrice != 0 ? filter.MaxPrice >= x.Price : x.Price > 0)
                        .Where(x => filter.MinPrice != 0 ? filter.MinPrice <= x.Price : x.Price > 0)
                        .Take(filter.PageSize).ToList();

                    
                    return productItems;
                    
                case SubcategoryType.Coverall:
                    //babyItems = babyItems.Where(x => x.ProductSizes.Where(x => filter.ProductSize.Contains(x.Size)).Count() > 0)
                    productItems = productItems.Where(x => x.ProductSizes.Where(x => filter.ProductSize != null ? filter.ProductSize.Contains(x.Size) : productItems.Any()).Count() > 0)

.Where(x => x.SubcategoryType == SubcategoryType.Coverall)
                           .Where(x => filter.MaxPrice != 0 ? filter.MaxPrice >= x.Price : x.Price > 0)
                           .Where(x => filter.MinPrice != 0 ? filter.MinPrice <= x.Price : x.Price > 0)
                           .Take(filter.PageSize).ToList();




                    return productItems;
           
            }

            return productItems;
           
            
        }

        public async Task<ServiceResponse<PaginatedProductItemsDTO>> GetPaginatedProductItems(ProductFiltersDTO filters)
        {
            try
            {   
                
                var productItems = getBabyItemsFiltered(filters);
                var baby = _context.Product;
                var counted = new List<ProductDTO>();
                

                {
                    foreach (var item in productItems)
                    {
                       
                        var totalItemsPerCategory = productItems.Where(x => x.SubcategoryType == item.SubcategoryType).Count();

                        var totalItemsPerSize = item.ProductSizes.Count();
                      
                      



                        counted.Add(new ProductDTO
                        {
                            ProductId = item.ProductId,
                            SubcategoryType = item.SubcategoryType,
                            ProductCategory = item.ProductCategory,
                            Description = item.Description,
                            Title = item.Title,
                            Price = item.Price,
                            ProductPictures = item.ProductPictures,
                            ProductSizes = item.ProductSizes,
                            TotalCategoryItems = totalItemsPerCategory,
                            TotalSize = totalItemsPerSize
                       
                        });
                    }
                }

                var bodysuits = productItems.Where(x => x.SubcategoryType == SubcategoryType.Bodysuit).Count();
                var coveralls = productItems.Where(x => x.SubcategoryType == SubcategoryType.Coverall).Count();
                var zeroToThree = productItems.Where(x => x.ProductSizes.Where(y => y.Size == GenericFunctions.ConvertBabySizeEnumToString(BabySizeType.ZeroToThree)).Any()).Count();
                var threeToSix = productItems.Where(x => x.ProductSizes.Where(y => y.Size == GenericFunctions.ConvertBabySizeEnumToString(BabySizeType.ThreeToSix)).Any()).Count();
                var sixToNine = productItems.Where(x => x.ProductSizes.Where(y => y.Size == GenericFunctions.ConvertBabySizeEnumToString(BabySizeType.SixToNine)).Any()).Count();
                var nineToTwelve = productItems.Where(x => x.ProductSizes.Where(y => y.Size == GenericFunctions.ConvertBabySizeEnumToString(BabySizeType.NineToTwelve)).Any()).Count();
                var twelveToEighteen = productItems.Where(x => x.ProductSizes.Where(y => y.Size == GenericFunctions.ConvertBabySizeEnumToString(BabySizeType.TwelveToEighteen)).Any()).Count();
                var eighteenToTwentyFour = productItems.Where(x => x.ProductSizes.Where(y => y.Size == GenericFunctions.ConvertBabySizeEnumToString(BabySizeType.EighteenToTwentyFour)).Any()).Count();

                var minPirce = productItems.Min(x => x.Price);
                var maxPrice = productItems.Max(x => x.Price);

                var priceRange = new ProductPriceDTO
                {
                    MinPrice = minPirce,
                    MaxPrice = maxPrice
                };



                var totalCategory = new BabyCategoriesDTO
                {
                    Bodysuits = bodysuits,
                    Coveralls = coveralls,
                };

                var totalSizes = new ProductSizesEnumDTO
                {
                    ZeroToThree = zeroToThree,
                    ThreeToSix = threeToSix,
                    SixToNine = sixToNine,
                    NineToTwelve = nineToTwelve,
                    TwelveToEighteen = twelveToEighteen,
                    EighteenToTwentyFour = eighteenToTwentyFour
                };

                var totalRecords = _context.Product

                     .Where(x => filters.MinPrice <= x.Price)
                     .Where(x => filters.MaxPrice >= x.Price).Count();
                //.Where(x => filters.BabySize[0] != 0 ? filters.BabySize.Count == 0 || filters.BabySize.Contains(x.BabySize) : true).Count();

                var totalPages = filters.PageSize != 0 ? totalRecords / filters.PageSize : 1;
                if (totalRecords == filters.PageSize) totalPages--;

                var response = new PaginatedProductItemsDTO
                {
                    ProductItems = counted,
                    TotalPages = totalPages,
                    CurrentPageNumber = filters.PageNumber,
                    TotalItems = totalRecords,
                    PriceRange = priceRange,
                    TotalItemsPerCategory = totalCategory,
                    TotalSizes = totalSizes
                    
                };

                return new ServiceResponse<PaginatedProductItemsDTO> { Response = response, Success = true };
            }
            catch(Exception e)
            {
                return new ServiceResponse<PaginatedProductItemsDTO> { Response = null, Success = false, Message = Messages.Message_GetPaginatedBabyItemsError };
            }
        }







    }
    
}
