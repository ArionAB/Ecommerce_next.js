﻿using Ecommerce.DataLayer.Utils;
using Newtonsoft.Json;
using System;
using System.IO;

namespace Ecommerce.ServiceLayer.Utils
{
    public class GenericFunctions
    {
        public static DateTime GetCurrentDateTime()
        {
            return TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("E. Europe Standard Time"));
        }

        public static string ParseDateTime(DateTime dateTime)
        {
            {
                var date = new DateTime().ToString("yyyy-MM-dd HH:mm");
                if ((dateTime.ToString("yyyy-MM-dd HH:mm").Equals(date)))
                {
                    return null;
                }
                var unspecifiedDate = DateTime.SpecifyKind(dateTime, DateTimeKind.Unspecified);
                return TimeZoneInfo.ConvertTimeToUtc(unspecifiedDate, TimeZoneInfo.FindSystemTimeZoneById("E. Europe Standard Time")).ToString("yyyy-MM-dd HH:mmZ");
            }

        }

        public static DateTime? ParseStringToDateTime(string dateTime)
        {
            if (dateTime == null)
            {
                return DateTime.MinValue;
            }
            var dateAsDate = Convert.ToDateTime(dateTime).ToUniversalTime();
            DateTime date = TimeZoneInfo.ConvertTimeFromUtc(dateAsDate, TimeZoneInfo.FindSystemTimeZoneById("E. Europe Standard Time"));
            return date;
        }

        public static string SerializeObject(Object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }

        public static string GetFileNameHashed(string fileName)
        {
            return Guid.NewGuid().ToString("N") + Path.GetExtension(fileName);
        }

        public static bool GuidIsNullOrEmpty(Guid guid)
        {
            if (guid == null || guid == Guid.Empty)
            {
                return true;
            }
            return false;
        }

  

        public static string ConvertSizeTypeEnumToInt(SizeType sizeType)
        {
            switch (sizeType)
            {
                case SizeType.Small:
                    return "1";
                case SizeType.Big:
                    return "2";
         
                default:
                    return "0";
            }
        }
        public static bool IsMoreThan3DaysAgo(DateTime date)
        {
            TimeSpan timeSpan = DateTime.Now - date;
            int daysAgo = (int)timeSpan.TotalDays;
            return daysAgo > 3;
        }


    }
}
