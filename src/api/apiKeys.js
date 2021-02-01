import axiosInstance from './config';

function index(headers, params) {
  return axiosInstance.get('/v1/api_keys', { headers, params });
}

function create(headers) {
  return axiosInstance.post('/v1/api_keys', {}, { headers });
}

function destroy(apiKeyId, headers) {
  return axiosInstance.delete(`/v1/api_keys/${apiKeyId}`, { headers });
}

export default {
  index,
  create,
  destroy,
};