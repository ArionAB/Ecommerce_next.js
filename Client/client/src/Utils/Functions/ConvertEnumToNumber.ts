export const ConvertBabySizeType = (enumValue: any) => {
  switch (enumValue) {
    case "All":
      return 0;
    case "ZeroToThree":
      return 1;
    case "ThreeToSix":
      return 2;
    case "SixToNine":
      return 3;
    case "NineToTwelve":
      return 4;
    case "TwelveToEighteen":
      return 5;
    default:
      return 0;
  }
};

export const ConvertProductCategoryType = (enumValue: number) => {
  switch (enumValue) {
    case 1:
      return "All";
    case 2:
      return "Girls";
    case 3:
      return "Boys";
    case 4:
      return "Baby";
    case 5:
      return "Accesories";
    case 6:
      return "Footwear";
    default:
      return "All";
  }
};

export const ConvertSizeToLabel = (enumValue: number) => {
  switch (enumValue) {
    case 1:
      return "0-3 M";
    case 2:
      return "3-6 M";
    case 3:
      return "6-9 M";
    case 4:
      return "9-12 M";
    case 5:
      return "12-18 M";
  }
};
