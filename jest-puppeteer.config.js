const config = {
  launch: {
    headless: true,
    args: [
      '--disable-web-security',
    ],
  },
};

if (process.env.SKIP_JEST_PUPPETEER_SERVER !== 'true') {
  config.server = {
    command: 'yarn serve --port=4444',
    port: 4444,
  };
}

module.exports = config;
