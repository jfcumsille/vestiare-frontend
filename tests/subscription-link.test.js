import 'expect-puppeteer';
import { linkIntents, subscriptions } from './api-responses';

const WIDGET_URL = 'http://localhost:4444/widget-iframe';

const paramsFactory = () => (
  {
    public_key: 'some_public_api_key',
    redirect_to: 'http://localhost:4444/login',
    customer_id: 'some_id',
    product: 'subscription',
    holder_type: 'individual',
  }
);

describe('Subscription link creation', () => {
  const params = paramsFactory();
  const username = '123123123';
  const formattedUsername = '12.312.312-3';
  const maxPollingCount = 2;
  const linkIntentId = 1;
  const subscriptionId = 1;
  const createdLinkId = 2;
  const temporaryLinkToken = 'some_link_token';
  let createdLinkIntent;
  let succeededLinkIntent;
  let linkIntentPollingCount;
  let createLinkIntentParams;
  let createdSubscription;
  let updatedSubscription;
  let receivedRequiresAction;
  let subscriptionPollingCount;
  let succeededSubscription;
  let createSubscriptionParams;
  let updateSubscriptionParams;

  const varSetup = () => {
    createdLinkIntent = false;
    succeededLinkIntent = false;
    linkIntentPollingCount = 0;
    createLinkIntentParams = {};
    createdSubscription = false;
    updatedSubscription = false;
    receivedRequiresAction = false;
    subscriptionPollingCount = 0;
    succeededSubscription = false;
  };

  const navigateToBankLogin = async (page) => {
    await page.goto(`${WIDGET_URL}?${new URLSearchParams(params)}`);
    await page.click('#intro-continue-btn');
    await page.waitForSelector('#bank-btns-container button');
    await page.click('#bank-btns-container button');
    await page.waitForSelector('#bank-login-submit-btn');
  };

  const navigateToSubscriptionConfirmation = async (page) => {
    await navigateToBankLogin(page);
    await page.type('#rut-input', username);
    await page.type('#password-input', 'jonsnow');
    await page.click('#bank-login-submit-btn');
    await page.waitForSelector('#confirm-subscription-btn');
  };

  const mockLinkIntentCreation = async (request) => {
    await request.respond(linkIntents.successfulCreate(linkIntentId));
    createdLinkIntent = true;
  };

  const mockLinkIntentPolling = (request) => {
    if (linkIntentPollingCount < maxPollingCount) {
      request.respond(linkIntents.processingStatusGet(linkIntentId));
      linkIntentPollingCount += 1;
    } else {
      request.respond(linkIntents.successfulGet({
        holderType: params.holder_type,
        linkId: createdLinkId,
        temporaryLinkToken,
        username,
      }));
      succeededLinkIntent = true;
    }
  };

  const linkIntentRequestHandler = (request) => {
    if (request.url().endsWith('/internal/v1/link_intents/widget') && request.method() === 'POST') {
      mockLinkIntentCreation(request);
      createLinkIntentParams = JSON.parse(request.postData());
    } else if (request.url().endsWith(`/internal/v1/link_intents/widget/${linkIntentId}`)
      && request.method() === 'GET') {
      mockLinkIntentPolling(request);
    } else {
      request.continue();
    }
  };

  const mockSubscriptionCreation = async (request) => {
    await request.respond(subscriptions.successfulCreate(subscriptionId));
    createdSubscription = true;
  };

  const mockSubscriptionUpdate = async (request) => {
    await request.respond(subscriptions.successfulUpdate(subscriptionId));
    updatedSubscription = true;
  };

  const mockSubscriptionPolling = (request, secondFactor, challenges) => {
    if (subscriptionPollingCount < maxPollingCount) {
      request.respond(linkIntents.processingStatusGet(linkIntentId));
      subscriptionPollingCount += 1;
    } else if (!receivedRequiresAction) {
      request.respond(subscriptions.get({
        subscriptionId,
        status: 'requires_action',
        nextAction: { type: secondFactor, challenges },
      }));
      receivedRequiresAction = true;
    } else {
      request.respond(subscriptions.get({ subscriptionId, status: 'succeeded' }));
      succeededSubscription = true;
    }
  };

  const subscriptionRequestHandler = (request, secondFactor, challenges = []) => {
    if (request.url().includes('link_intents')) {
      linkIntentRequestHandler(request);
    } else if (request.url().endsWith('/internal/v1/accounts/1/subscriptions') && request.method() === 'POST') {
      mockSubscriptionCreation(request);
      createSubscriptionParams = JSON.parse(request.postData());
    } else if (request.url().endsWith(`/internal/v1/subscriptions/${subscriptionId}?link_token=${temporaryLinkToken}`)
      && request.method() === 'GET') {
      mockSubscriptionPolling(request, secondFactor, challenges);
    } else if (request.url().endsWith(`/internal/v1/subscriptions/${subscriptionId}`) && request.method() === 'PATCH') {
      mockSubscriptionUpdate(request);
      updateSubscriptionParams = JSON.parse(request.postData());
    } else {
      request.continue();
    }
  };

  const testSubscriptionSuccessRedirect = () => {
    describe('when clicking on final exit btn', () => {
      beforeAll(async () => {
        await Promise.all([
          page.waitForNavigation(),
          page.click('#subscription-exit-btn'),
        ]);
      });

      it('redirects to redirect_to param with correct query params', () => {
        const url = page.url();
        const redirectParams = new URLSearchParams(url.replace(`${params.redirect_to}?`, ''));
        expect(url.startsWith(params.redirect_to)).toBe(true);
        expect(redirectParams.get('result')).toEqual('subscription_created');
        expect(redirectParams.get('link_id')).toEqual(createdLinkId.toString());
        expect(redirectParams.get('subscription_id')).toEqual(subscriptionId.toString());
        expect(redirectParams.get('account_id')).toEqual('1');
        expect(redirectParams.get('username')).toEqual(username);
      });
    });
  };

  beforeAll(async () => {
    jest.setTimeout(10000);
  });

  describe('when clicking on close button', () => {
    beforeAll(async () => {
      await navigateToBankLogin(page);
      await Promise.all([
        page.waitForNavigation(),
        page.click('#exit-btn'),
      ]);
    });

    it('redirects to redirect_to param with result = user_exited in query', () => {
      expect(page.url()).toEqual(`${params.redirect_to}?result=user_exited`);
    });
  });

  describe('when submitting bank credentials and eventually receiving a succesful response', () => {
    beforeAll(async () => {
      varSetup();
      await page.setRequestInterception(true);
      page.on('request', linkIntentRequestHandler);
      await navigateToSubscriptionConfirmation(page);
    });

    afterAll(async () => {
      page.off('request', linkIntentRequestHandler);
      await page.setRequestInterception(false);
    });

    it('posts to fintoc to create a link intent with correct params', () => {
      const linkData = createLinkIntentParams.link_data;
      expect(createdLinkIntent).toBe(true);
      expect(createLinkIntentParams.callback_url).toEqual(params.webhook_url);
      expect(linkData.holder_type).toEqual(params.holder_type);
      expect(linkData.product).toEqual('subscription');
      expect(linkData.username).toEqual(formattedUsername);
      expect(linkData.holder_id).toEqual('');
    });

    it('polls for link_intent until succeeded response', () => {
      expect(succeededLinkIntent).toBe(true);
      expect(linkIntentPollingCount).toBe(maxPollingCount);
    });

    it('shows confirmation step', async () => {
      await expect(page).toMatchElement('#confirm-subscription-btn');
    });
  });

  describe('when confirming default bank account and eventually receiving requires action enter_device_code', () => {
    const requestHandler = (request) => subscriptionRequestHandler(request, 'enter_device_code');

    beforeAll(async () => {
      varSetup();
      await page.setRequestInterception(true);
      page.on('request', requestHandler);
      await navigateToSubscriptionConfirmation(page);
      await page.click('#confirm-subscription-btn');
      await page.waitForSelector('#single-code-second-factor-input');
    });

    afterAll(async () => {
      page.off('request', requestHandler);
      await page.setRequestInterception(false);
    });

    it('posts to fintoc to create a subscription with correct params', () => {
      expect(createdSubscription).toBe(true);
      expect(createSubscriptionParams.customer_id).toEqual(params.customer_id);
      expect(createSubscriptionParams.link_token).toEqual(temporaryLinkToken);
    });

    it('polls for subscription until requires_action response', () => {
      expect(receivedRequiresAction).toBe(true);
      expect(subscriptionPollingCount).toBe(maxPollingCount);
    });

    it('shows step with input to enter code', async () => {
      await expect(page).toMatchElement('#single-code-second-factor-input');
    });

    describe('when submitting device code and eventually receiving succesful response', () => {
      const code = '000000';

      beforeAll(async () => {
        await page.type('#single-code-second-factor-input', code);
        await page.click('#second-factor-auth-btn');
        await page.waitForSelector('#subscription-exit-btn');
      });

      it('sends patch to fintoc to submit code to created subscription', () => {
        expect(updatedSubscription).toBe(true);
        expect(updateSubscriptionParams.second_factor).toEqual(code);
        expect(updateSubscriptionParams.link_token).toEqual(temporaryLinkToken);
      });

      it('polls for subscription until success response', () => {
        expect(succeededSubscription).toBe(true);
        expect(subscriptionPollingCount).toBe(maxPollingCount);
      });

      it('shows final subscription step', async () => {
        await expect(page).toMatchElement('#subscription-exit-btn');
      });

      testSubscriptionSuccessRedirect();
    });
  });
});
