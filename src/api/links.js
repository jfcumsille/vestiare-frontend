import axiosInstance from './config';

function get(linkId, headers) {
  return axiosInstance.get(`/internal/v1/links/${linkId}`, { headers });
}

function regenerateAccessToken(linkId, headers) {
  return axiosInstance
    .post(`/internal/v1/links/${linkId}/regenerate_access_token`, {
      headers,
    });
}

export default {
  get,
  regenerateAccessToken,
};
