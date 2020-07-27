import 'expect-puppeteer';
import { linkIntents } from './api-responses';

const WIDGET_URL = 'http://localhost:4444/widget-iframe';

describe('Movement link creation', () => {
  const paramsFactory = () => (
    {
      public_key: 'some_public_api_key',
      redirect_to: 'https://www.google.com',
      webhook_url: 'https://www.somedomain.com/webhook',
      customer_id: 'some_id',
    }
  );

  const navigateToBankLogin = async (page) => {
    await page.click('#intro-continue-btn');
    await page.waitForSelector('#bank-btns-container button');
    await page.click('#bank-btns-container button');
    await page.waitForSelector('#bank-login-submit-btn');
  };

  describe('with holder_type = business', () => {
    const params = paramsFactory();
    params.holder_type = 'business';

    beforeAll(async () => {
      await page.goto(`${WIDGET_URL}?${new URLSearchParams(params)}`);
    });

    it('should ask for company rut', async () => {
      await navigateToBankLogin(page);
      await expect(page).toMatchElement('#holder-id-input');
    });
  });

  describe('with holder_type = individual', () => {
    const params = paramsFactory();
    params.holder_type = 'individual';

    beforeAll(async () => {
      await page.goto(`${WIDGET_URL}?${new URLSearchParams(params)}`);
    });

    it('should not ask for company rut', async () => {
      await navigateToBankLogin(page);
      await expect(page).not.toMatchElement('#holder-id-input');
    });

    describe('when submitting credentials and eventually receiving a succesful response', () => {
      const username = '123123123';
      const maxPollingCount = 2;
      const linkIntentId = 1;
      let createdLinkIntent = false;
      let succeededLinkIntent = false;
      let pollingCount = 0;
      let createParams = {};

      const mockLinkIntentCreation = (request) => {
        request.respond(linkIntents.createSuccess(linkIntentId));
        createdLinkIntent = true;
      };

      const mockLinkIntentPolling = (request) => {
        if (pollingCount < maxPollingCount) {
          request.respond(linkIntents.getProcessing(linkIntentId));
          pollingCount += 1;
        } else {
          request.respond(linkIntents.getSuccess({
            holderType: params.holder_type,
            username,
          }));
          succeededLinkIntent = true;
        }
      };

      const setupRequestInterception = async () => {
        await page.setRequestInterception(true);
        page.on('request', (request) => {
          if (request.url().endsWith('/internal/v1/link_intents/widget') && request.method() === 'POST') {
            mockLinkIntentCreation(request);
            createParams = JSON.parse(request.postData());
          } else if (request.url().endsWith(`/internal/v1/link_intents/widget/${linkIntentId}`)
            && request.method() === 'GET') {
            mockLinkIntentPolling(request);
          } else {
            request.continue();
          }
        });
      };

      beforeAll(async () => {
        await setupRequestInterception();
        await page.type('#rut-input', username);
        await page.type('#password-input', 'jonsnow');
        await Promise.all([
          page.click('#bank-login-submit-btn'),
          page.waitForNavigation(),
        ]);
      });

      it('posts to fintoc to create a link intent with correct params', async () => {
        const linkData = createParams.link_data;
        expect(createdLinkIntent).toBe(true);
        expect(createParams.callback_url).toEqual(params.webhook_url);
        expect(linkData.holder_type).toEqual(params.holder_type);
        expect(linkData.product).toEqual('movements');
        expect(linkData.holder_id).toEqual('');
      });

      it('polls for link_intent until succeeded response', async () => {
        expect(succeededLinkIntent).toBe(true);
        expect(pollingCount).toBe(maxPollingCount);
      });

      it('redirects to redirect_to param', async () => {
        expect(page.url().startsWith(params.redirect_to)).toBe(true);
      });
    });
  });
});
