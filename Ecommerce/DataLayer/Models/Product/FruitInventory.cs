using Ecommerce.DataLayer.Utils;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.DataLayer.Models.Product
{
    [Keyless]
    public class FruitInventory
        
    {
       public FruitType FruitType { get; set; }

        public int Quantity { get; set; }
    }
}
