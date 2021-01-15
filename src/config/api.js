import axios from "axios";
require("dotenv").config();

//! creating a proxy request to change the base url using AXIOS
export default axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  timeout: 5000,
  withCredentials: true,
});
