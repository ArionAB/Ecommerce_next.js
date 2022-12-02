export var baseUrl = "";

const prodUrl = "https://fit4allstaging.azurewebsites.net/";
const devUrl = "https://localhost:44345/";

if (process.env.NODE_ENV === "development") {
  baseUrl = devUrl;
}
if (process.env.NODE_ENV === "production") {
  baseUrl = prodUrl;
}
