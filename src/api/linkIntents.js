import axiosInstance from './config';

const linkIntentsUrl = '/internal/v1/link_intents';
const dashboardUrl = `${linkIntentsUrl}/dashboard`;
const widgetUrl = `${linkIntentsUrl}/widget`;

const privateEndpoints = ['dashboard'];

// eslint-disable-next-line camelcase
function create(formData, headers, createdThrough, mode) {
  const url = privateEndpoints.includes(createdThrough) ? dashboardUrl : widgetUrl;
  Object.assign(formData.link_data, { mode: mode || 'live' });
  return axiosInstance
    .post(url, {
      ...formData,
    }, {
      headers,
    });
}

function get(linkIntentId, headers, callingFrom) {
  const url = privateEndpoints.includes(callingFrom) ? dashboardUrl : widgetUrl;
  return axiosInstance.get(`${url}/${linkIntentId}`, { headers });
}

export default {
  create,
  get,
};
