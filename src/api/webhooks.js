import axiosInstance from './config';

function index(headers, params) {
  return axiosInstance.get('/internal/v1/webhook_endpoints', { headers, params });
}

function create(headers, params, requestBody) {
  return axiosInstance.post('/internal/v1/webhook_endpoints', requestBody, { headers, params });
}

function destroy(headers, params) {
  return axiosInstance.delete(`/internal/v1/webhook_endpoints/${params.id}`, { headers, params: { mode: params.mode, current_organization_id: params.current_organization_id } });
}

function update(headers, params, requestBody) {
  return axiosInstance.put(`/internal/v1/webhook_endpoints/${params.id}`, requestBody, { headers, params: { mode: params.mode, current_organization_id: params.current_organization_id } });
}

function sendTestWebhookEvent(headers, params, requestBody) {
  return axiosInstance.post(`/internal/v1/webhook_endpoints/${params.id}/test`, requestBody, { headers, params: { mode: params.mode, current_organization_id: params.current_organization_id } });
}

function getAvailableWebhookEventTypes(headers) {
  return axiosInstance.get('/internal/v1/webhook_event_types', { headers });
}

function getWebhookSecret(headers, params) {
  return axiosInstance.get(`/internal/v1/webhook_endpoints/${params.id}/secret`, { headers, params });
}

export default {
  index,
  create,
  destroy,
  update,
  sendTestWebhookEvent,
  getAvailableWebhookEventTypes,
  getWebhookSecret,
};
