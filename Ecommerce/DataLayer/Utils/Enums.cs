﻿namespace Ecommerce.DataLayer.Utils
{
    public enum UserType
    {
        User = 1,
        Admin = 2
        
    }



    public enum BabySizeType
    {
        ZeroToThree = 1,
        ThreeToSix = 2,
        SixToNine = 3,
        NineToTwelve = 4,
        TwelveToEighteen = 5,
        EighteenToTwentyFour = 6
    }

    public enum CategoryType
    {
        Bodysuit = 1,
        Coverall = 2
    }


    

    public static class MessageType
    {
        public static string Error { get { return "error"; } }
        public static string Success { get { return "success"; } }
        public static string Info { get { return "info"; } }
    }
}
