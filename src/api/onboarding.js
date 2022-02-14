import axiosInstance from './config';

function index(headers) {
  return axiosInstance.get('/internal/v1/onboarding', { headers });
}

export default {
  index,
};
