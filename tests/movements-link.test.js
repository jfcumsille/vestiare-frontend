import 'expect-puppeteer';

const WIDGET_URL = 'http://localhost:4444/widget-iframe';

describe('Movement link creation', () => {
  const paramsFactory = () => (
    {
      public_key: 'some_public_api_key',
      redirect_to: 'https://domain.com',
      webhook_url: 'https://domain.com/webhook',
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
  });
});
