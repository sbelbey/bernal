const { findOnlyUsers} = require('../services/userServices');

module.exports = async (req, res, next) => {
  const { id } = req;
  const userToVerify = await findOnlyUsers(id);
  if (!userToVerify || !userToVerify.isAdmin) {
    return res.status(401).json({
      errors: {
        msg: 'Invalid Credentials',
      },
    });
  }
  next();
};
