import axios from "axios";
import { baseURL } from "./baseurl";

const authaxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authentication: "Empty",
  },
});

export default authaxios;
