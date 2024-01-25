import axios from 'axios';
import {API_KEY} from '../config';
import {ENDPOINTS} from '../config/ENDPOINTS';

export const axiosService = axios.create({
  baseURL: ENDPOINTS.BASE_URL,
});

axiosService.interceptors.request.use(config => {
  config.params = {...config.params, key: API_KEY};
  return config;
});
