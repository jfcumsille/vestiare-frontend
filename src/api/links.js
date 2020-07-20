import axiosInstance from './config';

function get(linkId, headers) {
  return axiosInstance.get(`/internal/v1/links/${linkId}`, { headers });
}

function regenerateLinkToken(linkId, headers) {
  return axiosInstance
    .post(`/internal/v1/links/dashboard/${linkId}/regenerate_link_token`, {}, {
      headers,
    });
}

export default {
  get,
  regenerateLinkToken,
};
