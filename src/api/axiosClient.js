/* eslint-disable no-undef */
/* eslint-disable implicit-arrow-linebreak */
import axios from "axios";
import queryString from "query-string";

const token = sessionStorage.getItem("token");
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(
  async (config) =>
    // Handle token here ...
    // eslint-disable-next-line comma-dangle
    config
);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
    // eslint-disable-next-line comma-dangle
  }
);
export default axiosClient;
