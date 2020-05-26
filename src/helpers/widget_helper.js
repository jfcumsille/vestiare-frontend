function getValidUrl(url) {
  // Adapted from https://stackoverflow.com/a/11300985
  let newUrl = window.decodeURIComponent(url);
  newUrl = newUrl.trim().replace(/\s/g, '');
  if (!newUrl) return '';

  if (/^(:\/\/)/.test(newUrl)) {
    return `http${newUrl}`;
  }
  if (!/^https?:\/\//i.test(newUrl)) {
    return `http://${newUrl}`;
  }

  return newUrl;
}

function validateQueryParams(params) {
  const requiredParams = ['callback-url', 'public-api-key', 'holder-type', 'return-result-to'];

  return requiredParams.every((key) => Object.prototype.hasOwnProperty.call(params, key));
}

function redirectUrl(params) {
  if (Object.prototype.hasOwnProperty.call(params, 'return-result-to')) {
    return getValidUrl(params['return-result-to']);
  }

  return 'login';
}

module.exports = {
  validateQueryParams,
  redirectUrl,
  getValidUrl,
};
