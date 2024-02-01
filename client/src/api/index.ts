import axios from "axios";
import { getFromLocalStorage } from "../helpers/auth";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API}`,
});
api.defaults.headers.common["Authorization"] =
  getFromLocalStorage("auth").token;
api.defaults.headers.common["ngrok-skip-browser-warning"] = "true";
// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_APP_API}`,
// });
export default api;
