import axios from "axios";
import Token from "./token.js";

const token = Token.get();

const defaultConfig = {
  baseURL: "http://127.0.0.1:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-Key": token,
  },
};

const api = axios.create(defaultConfig);

export default api;
