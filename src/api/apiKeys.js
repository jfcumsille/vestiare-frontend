import axiosInstance from './config';

function index(headers, params) {
  return axiosInstance.get('/v1/api_keys', { headers, params });
}

function create(headers, params) {
  return axiosInstance.post('/v1/api_keys', { headers, params });
}

function destroy(headers, params) {
  return axiosInstance.delete('/v1/api_keys', { headers, params });
}

export default {
  index,
  create,
  destroy,
};
