const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '/locales'),
  defaultLocale: 'en',
  api: {
    __: 'translate'
  }
});

module.exports = function i18nconf(req, res, next) {
  i18n.init(req, res);
  return next();
};
