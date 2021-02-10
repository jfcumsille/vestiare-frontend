import axiosInstance from './config';

function index(headers, params) {
  return axiosInstance.get('/v1/api_keys', { headers, params });
}

function create(headers, params) {
  return axiosInstance.post('/v1/api_keys', null, { headers: headers.headers, params });
}

function destroy(headers, params) {
  return axiosInstance.delete(`/v1/api_keys/${params.id}`, { headers: headers.headers, params: { current_organization_id: params.current_organization_id } });
}

export default {
  index,
  create,
  destroy,
};
