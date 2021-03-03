import axiosInstance from './config';

const countryUrl = '/internal/v1/countries';

function get(headers) {
  return axiosInstance.get(countryUrl, { headers });
}

export default {
  get,
};
