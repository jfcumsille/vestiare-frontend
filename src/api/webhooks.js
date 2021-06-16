import axiosInstance from './config';

function index(headers, params) {
  return axiosInstance.get('/v1/webhook_endpoints', { headers, params });
}

function create(headers, params) {
  return axiosInstance.post('/v1/webhook_endpoints', null, { headers: headers.headers, params });
}

function destroy(headers, params) {
  return axiosInstance.delete(`/v1/webhook_endpoints/${params.id}`, { headers: headers.headers, params: { current_organization_id: params.current_organization_id } });
}

export default {
  index,
  create,
  destroy,
};
