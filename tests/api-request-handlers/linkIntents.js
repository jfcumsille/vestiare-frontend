import { linkIntents as responses } from '../api-responses';

const mockCreation = async ({ request, linkIntentId }) => {
  await request.respond(responses.successfulCreate(linkIntentId));
};

const mockPolling = ({
  request,
  linkIntentId,
  respondWithProcessingStatus,
  successParams,
  processingCallback = () => null,
  successCallback = () => null,
}) => {
  if (respondWithProcessingStatus) {
    request.respond(responses.processingStatusGet(linkIntentId));
    processingCallback();
  } else {
    request.respond(responses.successfulGet(successParams));
    successCallback();
  }
};

const requestHandler = ({
  request,
  linkIntentId,
  respondPollingWithProcessingStatus,
  successParams,
  widgetConfigHandler,
  createdCallback = () => null,
  processingCallback = () => null,
  successCallback = () => null,
}) => {
  if (widgetConfigHandler && request.url().includes('widget_config')) {
    widgetConfigHandler(request);
  } else if (request.url().endsWith('/internal/v1/link_intents/widget') && request.method() === 'POST') {
    mockCreation({
      request,
      linkIntentId,
      createdCallback,
    });
    createdCallback(JSON.parse(request.postData()));
  } else if (request.url().endsWith(`/internal/v1/link_intents/widget/${linkIntentId}`)
    && request.method() === 'GET') {
    mockPolling({
      request,
      linkIntentId,
      respondWithProcessingStatus: respondPollingWithProcessingStatus,
      successParams,
      processingCallback,
      successCallback,
    });
  } else {
    request.continue();
  }
};

export default requestHandler;
