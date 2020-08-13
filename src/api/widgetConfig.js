import axiosInstance from './config';

const widgetConfigUrl = '/internal/v1/widget_config';

function get(headers) {
  return axiosInstance.get(widgetConfigUrl, { headers });
}

export default {
  get,
};
