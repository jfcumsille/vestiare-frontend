import { widgetConfig as responses } from '../api-responses';

const mockGet = async (request, companyName) => {
  await request.respond(responses.get({ companyName }));
};

const requestHandler = ({ request, companyName }) => {
  if (request.url().endsWith('/internal/v1/widget_config') && request.method() === 'GET') {
    mockGet(request, companyName);
  } else {
    request.continue();
  }
};

export default requestHandler;
