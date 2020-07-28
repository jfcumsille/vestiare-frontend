const headers = { 'Access-Control-Allow-Origin': '*' };

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
  holderType, username, linkId = 1, holderId = username,
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
