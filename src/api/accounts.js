import axiosInstance from './config';

function get({ linkToken, apiKey }) {
  return axiosInstance.get(`/v1/accounts?link_token=${linkToken}`, {
    headers: {
      Authorization: apiKey.token,
    },
  });
}

export default {
  get,
};
