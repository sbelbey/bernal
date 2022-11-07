const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

module.exports = {
  productCreated: async (req, res) => {
    const authorization = req.get('authorization');
    let token = '';
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
    }

    let decodedToken = {};
    try {
      decodedToken = jwt.verify(token, process.env.SECRET);
    } catch (error) {}

    if (!token || !decodedToken.id) {
      return res.status(401).json({
        errors: {
          email: {
            msg: 'Las credenciales no son válidas',
          },
        },
      });
    }
  },
};
