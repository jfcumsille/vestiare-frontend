import 'expect-puppeteer';
import { linkIntents as linkIntentHandler } from './api-request-handlers';

const WIDGET_URL = 'http://localhost:4444/widget-iframe';
jest.setTimeout(30000);
describe('Movement link creation', () => {
  const paramsFactory = () => (
    {
      public_key: 'some_public_api_key',
      redirect_to: 'http://localhost:4444/login',
      webhook_url: 'https://www.somedomain.com/webhook',
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
      await navigateToBankLogin(page);
    });

    it('should ask for company rut', async () => {
      await expect(page).toMatchElement('#holder-id-input');
    });

    describe('when clicking on close button', () => {
      beforeAll(async () => {
        await page.waitForSelector('#exit-btn');
        await Promise.all([
          page.waitForNavigation(),
          page.click('#exit-btn'),
        ]);
      });

      it('redirects to redirect_to param with result = user_exited in query', () => {
        expect(page.url()).toEqual(`${params.redirect_to}?result=user_exited`);
      });
    });
  });

  describe('with holder_type = individual', () => {
    const params = paramsFactory();
    params.holder_type = 'individual';

    const testMovementLinkCreation = () => {
      beforeAll(async () => {
        await page.goto(`${WIDGET_URL}?${new URLSearchParams(params)}`);
        await navigateToBankLogin(page);
      });

      it('should not ask for company rut', async () => {
        await expect(page).not.toMatchElement('#holder-id-input');
      });

      describe('when submitting credentials and eventually receiving a succesful response', () => {
        const username = '123123123';
        const formattedUsername = '12.312.312-3';
        const maxPollingCount = 2;
        const linkIntentId = 1;
        const createdLinkId = 2;
        let createdLinkIntent = false;
        let succeededLinkIntent = false;
        let pollingCount = 0;
        let createParams = {};

        const requestHandler = (request) => {
          if (request.url().includes('link_intents')) {
            linkIntentHandler({
              request,
              linkIntentId,
              respondPollingWithProcessingStatus: pollingCount < maxPollingCount,
              successParams: {
                holderType: params.holder_type,
                linkId: createdLinkId,
                username,
              },
              createdCallback: (requestParams) => {
                createdLinkIntent = true;
                createParams = requestParams;
              },
              processingCallback: () => { pollingCount += 1; },
              successCallback: () => { succeededLinkIntent = true; },
            });
          } else {
            request.continue();
          }
        };

        beforeAll(async () => {
          await page.setRequestInterception(true);
          page.on('request', requestHandler);
          await page.type('#rut-input', username);
          await page.type('#password-input', 'jonsnow');
          await Promise.all([
            page.waitForNavigation(),
            page.click('#bank-login-submit-btn'),
          ]);
        });

        afterAll(async () => {
          page.off('request', requestHandler);
          await page.setRequestInterception(false);
        });

        it('posts to fintoc to create a link intent with correct params', () => {
          const linkData = createParams.link_data;
          expect(createdLinkIntent).toBe(true);
          expect(createParams.callback_url).toEqual(params.webhook_url);
          expect(linkData.holder_type).toEqual(params.holder_type);
          expect(linkData.product).toEqual('movements');
          expect(linkData.username).toEqual(formattedUsername);
          expect(linkData.holder_id).toEqual('');
        });

        it('polls for link_intent until succeeded response', () => {
          expect(succeededLinkIntent).toBe(true);
          expect(pollingCount).toBe(maxPollingCount);
        });

        it('redirects to redirect_to param with correct query params', () => {
          const url = page.url();
          const redirectParams = new URLSearchParams(url.replace(`${params.redirect_to}?`, ''));
          expect(url.startsWith(params.redirect_to)).toBe(true);
          expect(redirectParams.get('result')).toEqual('link_created');
          expect(redirectParams.get('link_id')).toEqual(createdLinkId.toString());
          expect(redirectParams.get('username')).toEqual(username);
          expect(redirectParams.get('holder_type')).toEqual(params.holder_type);
        });
      });
    };

    describe('with product param = movements', () => {
      beforeAll(() => {
        params.product = 'movements';
      });

      testMovementLinkCreation();
    });

    describe('with no product in params', () => {
      beforeAll(() => {
        delete params.product;
      });

      testMovementLinkCreation();
    });
  });
});
