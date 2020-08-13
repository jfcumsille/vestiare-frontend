const headers = { 'Access-Control-Allow-Origin': '*' };

function get({ companyName }) {
  return {
    status: 200,
    headers,
    body: JSON.stringify({ company_name: companyName }),
  };
}

export default {
  get,
};
