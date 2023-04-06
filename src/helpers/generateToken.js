const jwt = require('jsonwebtoken');
module.exports = {
  createToken: (id, email, isAdmin) => {
    const userForToken = {
      id,
      email,
      isAdmin,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7,
    });

    return token;
  },
};
