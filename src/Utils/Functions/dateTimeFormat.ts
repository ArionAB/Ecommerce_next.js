export const dateTimeFormatOptions: any = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export const onlyDateFormat: any = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

export const onlyTimeFormat: any = {
  hour: "numeric",
  minute: "numeric",
};

export const getDateLabel = (isoDate: string, format: any): string => {
  var dateTime = new Date(isoDate);
  var response = dateTime.toLocaleDateString("ro-RO", format);
  return response;
};

export const getDateMonthLabel = (date: string) => {
  const monthNumber = date.split("-")[1];
  let monthName = "";
  switch (monthNumber) {
    case "1":
      monthName = "Ianuarie";
      break;
    case "2":
      monthName = "Februarie";
      break;
    case "3":
      monthName = "Martie";
      break;
    case "4":
      monthName = "Aprilie";
      break;
    case "5":
      monthName = "Mai";
      break;
    case "6":
      monthName = "Iunie";
      break;
    case "7":
      monthName = "Iulie";
      break;
    case "8":
      monthName = "August";
      break;
    case "9":
      monthName = "Septembrie";
      break;
    case "10":
      monthName = "Octombrie";
      break;
    case "11":
      monthName = "Noiembrie";
      break;
    case "12":
      monthName = "Decembrie";
      break;
  }

  let response = `${date.split("-")[0]} ${monthName}, ${date.split("-")[2]}  `;

  return response;
};
