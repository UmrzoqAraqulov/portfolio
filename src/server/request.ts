import axios, { AxiosInstance } from "axios";
import { TOKEN } from "../const";
import Cookies from "js-cookie";

const token = Cookies.get(TOKEN);

export const request: AxiosInstance = axios.create({
  baseURL: "https://ap-portfolio-backend.up.railway.app/api/v1/",
  timeout: 10000,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
