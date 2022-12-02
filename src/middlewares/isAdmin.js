const jwt = require('jsonwebtoken');
const { findOnlyUsers } = require('../services/userServices');

module.exports = async (req, res, next) => {
  //Get user token
  const authorization = req.get('authorization');
  let token = '';
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  //Decoding the token
  let decodedToken = {};
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    console.log(error);
  }

  const user = await findOnlyUsers(decodedToken.id);
  
  // if (user && user.isAdmin) {
    req.isAdmin = user && user.isAdmin;
  // }
  next();
};
