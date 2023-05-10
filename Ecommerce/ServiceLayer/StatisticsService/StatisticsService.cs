using AutoMapper;
using Ecommerce.DataLayer.DbContexts;
using Ecommerce.DataLayer.DTOs.Statistics;
using Ecommerce.DataLayer.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.ServiceLayer.StatisticsService
{
    public class StatisticsService : IStatisticsService
    {
        private readonly MainDbContext _context;
        private readonly IMapper _mapper;

        public StatisticsService(MainDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public async Task<ServiceResponse<Object>> GetStatistics(UserType userType)
        {
            try
            {
                if (userType != UserType.Admin)
                {
                    return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_NotAdmin };
                }

                var avgValue = _context.Orders.Select(order => order.TotalPrice).Average();
                var cartRate = 0;

                var mostSoldSize = new List<Object>();
                var sizeTypeStats = _context.OrderProducts.GroupBy(item => item.SizeType).Select(group => new
                {
                    SizeType = group.Key,
                    TotalOrders = group.Count(),
                    TotalQuantity = group.Sum(item => item.Quantity)
                }).ToList();

                foreach (var item in sizeTypeStats )
                {
                    mostSoldSize.Add(item);
                }

                var mostSoldType = new List<Object>();
                var productTypeStats = _context.OrderProducts.GroupBy(item => item.ProductCategory).Select(group => new
                {
                    ProductCategory = group.Key,
                    TotalOrders = group.Count(),
                    TotalQuantity = group.Sum(item => item.Quantity)
                }).ToList();

                foreach (var item in productTypeStats )
                {
                    mostSoldType.Add(item);
                }

                var mostSoldFruitType = new List<Object>();
                var fruitTypeStats = _context.OrderProducts.GroupBy(item => item.FruitType).Select(group => new
                {
                    FruitType = group.Key,
                    TotalOrders = group.Count(),
                    TotalQuantity = group.Sum(item => item.Quantity)
                });

                foreach (var item in fruitTypeStats)
                {
                    mostSoldFruitType.Add(item);
                }

                var productSales = new List<Object>();

                var mostSoldProducts = _context.OrderProducts.GroupBy(item => new { item.ProductId,  item.Title,  item.FruitType, item.ProductCategory }).Select(group => new
                {
                    ProductId = group.Key.ProductId,
                    //Quantity = group.Key.Quantity,
                    Title = group.Key.Title,
                    //SizeType = group.Key.SizeType,
                    FruitType = group.Key.FruitType,
                    ProductCategory = group.Key.ProductCategory,
                    //MixedFruitId = group.Key.MixedFruitId,
                    SalesCount = group.Count()
                }).ToList();

                foreach (var product in mostSoldProducts )
                {
                    productSales.Add( product );
                }

                var salesMonth = new List<Object>();

                var orderStats = _context.Orders.GroupBy(order => new
                {
                    year = order.DateCreated.Year,
                    month = order.DateCreated.Month,
                }).Select(group => new
                {
                    Year = group.Key.year,
                    Month = group.Key.month,
                    OrdersCount = group.Count(),
                    TotalSales = group.Sum(order => order.TotalPrice)
                }).OrderBy(group => group.Year).ThenBy(group => group.Month).ToList();

                foreach( var stats in orderStats)
                {
                    salesMonth.Add( stats );
                }

                var repeatCustomersCount = _context.Orders.GroupBy(order => order.UserId).Count(group  => group.Count() > 1);
                var totalCustomersCount = _context.Orders.Select(order => order.UserId).Distinct().Count();

                var retentionRate = (double)repeatCustomersCount / totalCustomersCount * 100;


                var statistics = new StatisticsDTO
                {
                    AverageOrderValue = (int)avgValue,
                    AbandonedCartRate = cartRate,
                    MostSoldSizeType = mostSoldSize,
                    MostSoldHoneyType = mostSoldType,
                    MostSoldFruitType = mostSoldFruitType,
                    ProductSales = productSales,
                    SalesPerMonth = salesMonth,
                    CustomerRetentionRate = repeatCustomersCount

                };

                return new ServiceResponse<Object> { Response = statistics, Success = true, Message = Messages.Message_GetStatisticsSuccess };

            } catch (Exception e)
            {
                return new ServiceResponse<Object> { Response = null, Success = false, Message = Messages.Message_GetStatisticsError };

            }
        }
    }
}
