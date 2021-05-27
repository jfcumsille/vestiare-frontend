import axiosInstance from './config';

function create(accountId, customerId, linkToken, authenticationHeader, callbackUrl) {
  return axiosInstance
    .post(`/internal/v1/accounts/${accountId}/subscriptions`, {
      customerId,
      linkToken,
      callbackUrl,
    }, {
      headers: authenticationHeader,
    });
}

function update(subscriptionId, data, authenticationHeader) {
  return axiosInstance
    .patch(`/internal/v1/subscriptions/${subscriptionId}`, data, {
      headers: authenticationHeader,
    });
}

function get(subscriptionId, linkToken, authenticationHeader) {
  return axiosInstance
    .get(`/internal/v1/subscriptions/${subscriptionId}?link_token=${linkToken}`, {
      headers: authenticationHeader,
    });
}

export default {
  create,
  update,
  get,
};
