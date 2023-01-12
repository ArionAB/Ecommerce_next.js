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
      return "500g";
    case 2:
      return "1kg";
    default:
      return "500g";
  }
};
