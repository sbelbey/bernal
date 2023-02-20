const jwt = require('jsonwebtoken');
const log4js = require('log4js');
const envConfig = require('../config/envConfig');
let logger;
if (envConfig.NODE_ENV === 'prod') {
  logger = log4js.getLogger('production');
} else {
  logger = log4js.getLogger();
}

module.exports = (req, res, next) => {
  const authorization = req.get('authorization');
  let token = '';
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      logger.info(err.message);
      return res.status(401).json({
        errors: {
          msg: 'Invalid Credentials',
        },
      });
    }

    req.user = user;
    next();
  });
};
