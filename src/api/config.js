import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

const instance = axios.create(
  {
    baseURL: process.env.VUE_APP_BASE_API_HOST,
    transformResponse: [
      ...axios.defaults.transformResponse,
      (data) => camelizeKeys(data),
    ],
    transformRequest: [
      (data) => decamelizeKeys(data),
      ...axios.defaults.transformRequest,
    ],
  },
);

export default instance;
