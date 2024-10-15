import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://laravel-blog-backend.test/api",
  baseURL: "https://developer.iamstillalive.co/arihant/blog-app/public/api",
  // baseURL: "http://206.1.58.168/api",
  headers: {
    Accept: "application/json",
  },
});
