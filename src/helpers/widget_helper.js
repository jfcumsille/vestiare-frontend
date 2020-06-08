const errorObject = require('./error_object');

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
  const holderTypes = ['individual', 'business'];

  const result = { valid: true, error: errorObject };

  requiredParams.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(params, key)) {
      result.valid = false;
      result.error.type = 'invalid_request_error';
      result.error.code = 'missing_parameter';
      result.error.message = `Missing required param: ${key}`;
      result.error.param = key;
    }

    if (result.valid && (params[key] === null || params[key] === '')) {
      result.valid = false;
      result.error.type = 'invalid_request_error';
      result.error.code = 'empty_string';
      result.error.message = `Empty string is invalid: ${key}`;
      result.error.param = key;
    }
  });

  if (result.valid && !holderTypes.includes(params.holder_type)) {
    result.valid = false;
    result.error.type = 'invalid_request_error';
    result.error.code = 'invalid_holder_type';
    result.error.message = `Invalid holder_type: ${params.holder_type}.
      An account holder type can be either individual or business.`;
    result.error.param = 'holder_type';
  }

  return result;
}

function redirectUrl(params) {
  if (Object.prototype.hasOwnProperty.call(params, 'redirect_to')) {
    return getValidUrl(params.redirect_to);
  }

  return 'login';
}

function queryize(params) {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
}

module.exports = {
  validateQueryParams,
  redirectUrl,
  getValidUrl,
  queryize,
};
