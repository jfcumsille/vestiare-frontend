import { linkIntents as responses } from '../api-responses';

const mockCreation = async ({ request, linkIntentId, createdCallback = () => null }) => {
  await request.respond(responses.successfulCreate(linkIntentId));
  createdCallback();
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

export default {
  mockCreation,
  mockPolling,
};
