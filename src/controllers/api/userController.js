const bcrypt = require('bcryptjs');

const { User } = require('../../database/models');

module.exports = {
  register: async (req, res) => {
    await User.create(req.body);
    return res.send({ message: 'User created' });
  },
};
