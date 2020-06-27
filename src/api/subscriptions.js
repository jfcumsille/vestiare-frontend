import axiosInstance from './config';

function create(accountId, customerId, linkToken, authenticationHeader) {
  return axiosInstance
    .post(`/internal/v1/accounts/${accountId}/subscriptions`, {
      customerId,
      linkToken,
    }, {
      headers: authenticationHeader,
    });
}

function update(accountId, subscriptionId, data, authenticationHeader) {
  return axiosInstance
    .patch(`/internal/v1/accounts/${accountId}/subscriptions/${subscriptionId}`, data, {
      headers: authenticationHeader,
    });
}

export default {
  create,
  update,
};
