const headers = { 'Access-Control-Allow-Origin': '*' };
const accounts = [
  {
    id: 1, type: 'checking_account', name: 'Cuenta Corriente', number: '123345890',
  },
];

function successfulCreate(linkIntentId) {
  return {
    status: 201,
    headers,
    body: JSON.stringify({ id: linkIntentId, status: 'processing_link_intent' }),
  };
}

function processingStatusGet(linkIntentId) {
  return {
    status: 200,
    headers,
    body: JSON.stringify({ id: linkIntentId, status: 'processing_link_intent' }),
  };
}

function successfulGet({
  holderType, username, linkId = 1, holderId = username, temporaryLinkToken = null,
}) {
  return {
    status: 200,
    headers,
    body: JSON.stringify({
      link: {
        id: linkId,
        institution: { id: 1 },
        holder_type: holderType,
        holder_id: holderId,
        username,
        accounts,
        temporaryLinkToken,
      },
      status: 'succeeded',
    }),
  };
}

export default {
  successfulCreate,
  processingStatusGet,
  successfulGet,
};
