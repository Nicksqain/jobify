import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API}`,
});
api.defaults.headers.common["ngrok-skip-browser-warning"] = "true";
// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_APP_API}`,
// });
export default api;
