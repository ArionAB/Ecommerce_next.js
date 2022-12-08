namespace Ecommerce.DataLayer.Utils
{
    public enum UserType
    {
        User = 1,
        Admin = 2
        
    }



    public enum BabySizeType
    {   
        All = 0,
        ZeroToThree = 1,
        ThreeToSix = 2,
        SixToNine = 3,
        NineToTwelve = 4,
        TwelveToEighteen = 5,
        EighteenToTwentyFour = 6
    }

    public enum SubcategoryType
    {
        All = 1,
        Bodysuit = 2,
        Coverall = 3
            
    }

    public enum ProductCategoryType
    {
        All = 1,
        Girls = 2,
        Boys = 3,
        Baby = 4,
        Accesories = 5,
        Footwear = 6
    }

  


    

    public static class MessageType
    {
        public static string Error { get { return "error"; } }
        public static string Success { get { return "success"; } }
        public static string Info { get { return "info"; } }
    }
}
