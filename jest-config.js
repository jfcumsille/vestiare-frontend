process.env.TZ = 'America/Santiago';

module.exports = {
  verbose: true,
  roots: ['tests'],
  preset: 'jest-puppeteer',
};