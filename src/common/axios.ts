import axios from 'axios';
import { ENDPOINT_BASE_URL } from './constants';

export const axiosInstance = axios.create({
  baseURL: ENDPOINT_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
