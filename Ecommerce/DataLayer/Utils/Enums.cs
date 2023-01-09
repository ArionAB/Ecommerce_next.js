namespace Ecommerce.DataLayer.Utils
{
    public enum UserType
    {
        User = 1,
        Admin = 2
        
    }

    public enum SizeType
    {
        Small = 1,
        Big = 2
    }



    //public enum BabySizeType
    //{   
    //    All = 0,
    //    ZeroToThree = 1,
    //    ThreeToSix = 2,
    //    SixToNine = 3,
    //    NineToTwelve = 4,
    //    TwelveToEighteen = 5,
    //    EighteenToTwentyFour = 6
    //}

  

    //public enum SubcategoryType
    //{
    //    All = 1,
    //    Bodysuit = 2,
    //    Coverall = 3
            
    //}

    public enum FruitType
    {
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
    }

    public enum ProductCategoryType
    {
        All = 1,
        Multiflower = 2,
        Accacia = 3,
        //Girls = 2,
        //Boys = 3,
        //Baby = 4,
        //Accesories = 5,
        //Footwear = 6
    }

  


    

    public static class MessageType
    {
        public static string Error { get { return "error"; } }
        public static string Success { get { return "success"; } }
        public static string Info { get { return "info"; } }
    }
}
