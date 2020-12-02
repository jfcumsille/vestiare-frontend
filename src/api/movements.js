import axiosInstance from './config';

function get({ linkToken, accountId, apiKey }) {
  return axiosInstance.get(`/v1/accounts/${accountId}/movements?link_token=${linkToken}`, {
    headers: {
      Authorization: apiKey,
    },
  });
}

export default {
  get,
};
