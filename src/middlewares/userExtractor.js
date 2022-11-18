const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = req.get('authorization');
  let token = '';
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  let decodedToken = {};
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    console.log(error);
  }

  if (!token || !decodedToken.id) {
    return res.status(401).json({
      errors: {
        msg: 'Invalid Credentials',
      },
    });
  }
  req.id = decodedToken.id;

  next();
};
