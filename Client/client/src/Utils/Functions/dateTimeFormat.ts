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
