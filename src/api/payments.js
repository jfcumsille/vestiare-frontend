import axiosInstance from './config';

function createPaymentIntent(headers, requestBody) {
  return axiosInstance.post('/v1/payment_intents', requestBody, { headers });
}

export default {
  createPaymentIntent,
};
