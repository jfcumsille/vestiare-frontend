import { subscriptions as responses } from '../api-responses';

const mockSubscriptionCreation = async (request, subscriptionId) => {
  await request.respond(responses.successfulCreate(subscriptionId));
};

const mockSubscriptionUpdate = async (request, subscriptionId) => {
  await request.respond(responses.successfulUpdate(subscriptionId));
};

const mockSubscriptionPolling = ({
  request,
  subscriptionId,
  secondFactor,
  challenges,
  beforeSubmittingSecondFactor,
  respondPollingWithLoadingStatus,
  loadingCallback = () => null,
  requiresActionCallback = () => null,
  successCallback = () => null,
}) => {
  if (respondPollingWithLoadingStatus) {
    const status = beforeSubmittingSecondFactor ? 'waiting_for_action' : 'processing_action';
    request.respond(responses.get({ subscriptionId, status }));
    loadingCallback();
  } else if (beforeSubmittingSecondFactor) {
    request.respond(responses.get({
      subscriptionId,
      status: 'requires_action',
      nextAction: { type: secondFactor, challenges },
    }));
    requiresActionCallback();
  } else {
    request.respond(responses.get({ subscriptionId, status: 'succeeded' }));
    successCallback();
  }
};

const requestHandler = ({
  request,
  subscriptionId,
  secondFactor,
  temporaryLinkToken,
  challenges,
  beforeSubmittingSecondFactor,
  respondPollingWithLoadingStatus,
  linkIntentHandler,
  loadingCallback = () => null,
  requiresActionCallback = () => null,
  successCallback = () => null,
  createdCallback = () => null,
  updatedCallback = () => null,
}) => {
  if (request.url().includes('link_intents')) {
    linkIntentHandler(request);
  } else if (request.url().endsWith('/internal/v1/accounts/1/subscriptions') && request.method() === 'POST') {
    mockSubscriptionCreation(request, subscriptionId);
    createdCallback(JSON.parse(request.postData()));
  } else if (request.url().endsWith(`/internal/v1/subscriptions/${subscriptionId}?link_token=${temporaryLinkToken}`)
    && request.method() === 'GET') {
    mockSubscriptionPolling({
      request,
      subscriptionId,
      secondFactor,
      challenges,
      beforeSubmittingSecondFactor,
      respondPollingWithLoadingStatus,
      loadingCallback,
      requiresActionCallback,
      successCallback,
    });
  } else if (request.url().endsWith(`/internal/v1/subscriptions/${subscriptionId}`) && request.method() === 'PATCH') {
    mockSubscriptionUpdate(request, subscriptionId);
    updatedCallback(JSON.parse(request.postData()));
  } else {
    request.continue();
  }
};

export default requestHandler;
