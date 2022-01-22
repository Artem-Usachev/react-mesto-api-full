const allowedCors = [
  'http://artem-usachev.students.nomoredomains.rocks',
  'https://artem-usachev.students.nomoredomains.rocks',
  'http://localhost:3000',
  'https://localhost:3000',
];

module.exports = (req, res, next) => {
  try {
    const { origin } = req.headers;
    const { method } = req;
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const requestHeaders = req.headers['access-control-request-headers'];
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', true);
    }
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      res.end();
    }
    next();
  } catch (err) {
    next(err);
  }
};
