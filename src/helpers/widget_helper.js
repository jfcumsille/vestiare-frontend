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
  const requiredParams = ['webhook_url', 'public_key', 'holder_type', 'redirect_to'];

  return requiredParams.every((key) => Object.prototype.hasOwnProperty.call(params, key));
}

function redirectUrl(params) {
  if (Object.prototype.hasOwnProperty.call(params, 'redirect_to')) {
    return getValidUrl(params.redirect_to);
  }

  return 'login';
}

module.exports = {
  validateQueryParams,
  redirectUrl,
  getValidUrl,
};
