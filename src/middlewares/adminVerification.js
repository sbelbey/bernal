const { findOnlyUsers} = require('../services/userServices');

module.exports = async (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    return res.status(401).json({
      errors: {
        msg: 'Invalid Credentials',
      },
    });
  }
  next();
};
