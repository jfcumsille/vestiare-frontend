import 'expect-puppeteer';

describe('Fintoc root', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4444');
  });

  it('should have "Fintoc" in title', async () => {
    await expect(page.title()).resolves.toMatch('Fintoc');
  });
});
