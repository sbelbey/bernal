const jwt = require('jsonwebtoken');
module.exports = {
  createToken: (id, email, admin) => {
    const userForToken = {
      id,
      email,
      admin,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7,
    });

    return token;
  },
};
