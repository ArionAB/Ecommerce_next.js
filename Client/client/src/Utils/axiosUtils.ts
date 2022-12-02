export const getAxiosErrorMessage = function (error: any): string | null {
  if (error.response) return error.response.data.message.text;
  if (error.request) return "Eroare conectare server!";
  return null;
};
