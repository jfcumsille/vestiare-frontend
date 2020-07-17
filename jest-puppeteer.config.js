if (process.env.SKIP_JEST_PUPPETEER_SERVER !== 'true') {
  module.exports = {
    server: {
      command: 'yarn serve --port=4444',
      port: 4444,
    },
  };
}
