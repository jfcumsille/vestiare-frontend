import axios from 'axios';

const instance = axios.create(
  {
    baseURL: process.env.BASE_API_HOST,
  },
);

export default instance;
