const headers = { 'Access-Control-Allow-Origin': '*' };

function successfulCreate(subscriptionId) {
  return {
    status: 201,
    headers,
    body: JSON.stringify({ id: subscriptionId, status: 'waiting_for_action' }),
  };
}

function get({ subscriptionId, status, nextAction = null }) {
  return {
    status: 200,
    headers,
    body: JSON.stringify({ id: subscriptionId, status, next_action: nextAction }),
  };
}

export default {
  successfulCreate,
  get,
};
