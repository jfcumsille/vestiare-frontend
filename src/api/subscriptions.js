import axiosInstance from './config';

function create(accountId, customerId, linkToken, authenticationHeader) {
  return axiosInstance
    .post(`/internal/v1/accounts/${accountId}/subscription`, {
      customerId,
      linkToken,
    }, {
      headers: authenticationHeader,
    });
}

export default {
  create,
};
