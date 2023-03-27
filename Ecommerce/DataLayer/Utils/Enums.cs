namespace Ecommerce.DataLayer.Utils
{
    public enum UserType
    {
        User = 1,
        Admin = 2,
        Guest = 3
        
    }

    public enum SizeType
    {
        Small = 1,
        Big = 2
    }





    public enum FruitType
    {
        nothing = 1,
        ananas = 2,
        aronia = 3,
        banane = 4,
        cocos = 5,
        curmale = 6,
        ghimbir = 7,
        goji = 8,
        lamaie = 9,
        mango = 10,
        merisor = 11,
        papaya = 12,
        mixed = 13,
    }

    public enum ProductCategoryType
    {
        All = 1,
        Multiflower = 2,
        Accacia = 3,
        Polen = 4,
        Propolis = 5
        
    
    }

    public enum OrderStatusType
    {
        
        Pending = 1,
        Shipped = 2,
        Delivered = 3,
        Cancelled = 4
    }

    public enum PaymentStatusType
    {
        Pending = 1,
        Paid = 2,
        Cancelled = 3
    }

    public enum PaymentMethodType
    {
        
        Cash = 1,
        Card = 2,
        Transfer = 3
    
    }

    public enum OrderSortBy
    {
      CreatedAt = 1,
      County = 2
    }

    public static class MessageType
    {
        public static string Error { get { return "error"; } }
        public static string Success { get { return "success"; } }
        public static string Info { get { return "info"; } }
    }
}
