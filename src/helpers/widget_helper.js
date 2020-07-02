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

function validateParamPresence(params, key) {
  const result = { valid: true, error: errorObject };

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

  return result;
}

function validateHolderType(holderType) {
  const holderTypes = ['individual', 'business'];
  const result = { valid: true, error: errorObject };

  if (!holderTypes.includes(holderType)) {
    result.valid = false;
    result.error.type = 'invalid_request_error';
    result.error.code = 'invalid_holder_type';
    result.error.message = `Invalid holder_type: ${holderType}.
      An account holder type can be either individual or business.`;
    result.error.param = 'holder_type';
  }
  return result;
}

function validateQueryParams(params) {
  const requiredParams = ['public_key', 'holder_type', 'redirect_to'];

  let result = { valid: true };
  let validation;

  requiredParams.forEach((key) => {
    validation = validateParamPresence(params, key);
    if (!validation.valid) result = validation;
  });

  validation = validateHolderType(params.holder_type);
  if (!validation.valid) result = validation;

  if (params.product === 'subscription') {
    validation = validateParamPresence(params, 'customer_id');
    if (!validation.valid) result = validation;
  } else {
    validation = validateParamPresence(params, 'webhook_url');
    if (!validation.valid) result = validation;
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
