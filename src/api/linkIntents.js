import axiosInstance from './config';

const linkIntentsUrl = '/internal/v1/link_intents';
const dashboardUrl = `${linkIntentsUrl}/dashboard`;
const widgetUrl = `${linkIntentsUrl}/widget`;

function create(formData, headers, createdThrough) {
  const url = createdThrough === 'dashboard' ? dashboardUrl : widgetUrl;
  return axiosInstance
    .post(url, {
      ...formData,
    }, {
      headers,
    });
}

function get(linkIntentId, headers, callingFrom) {
  const url = callingFrom === 'dashboard' ? dashboardUrl : widgetUrl;
  return axiosInstance.get(`${url}/${linkIntentId}`, { headers });
}

export default {
  create,
  get,
};
