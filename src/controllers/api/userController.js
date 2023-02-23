const passport = require('passport');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const { createUser, findUser, updateUser, allUsers, findOnlyUsers } = require('../../services/userServices');

const { userCleaner } = require('../../helpers/dataCleaner');
const { paging } = require('../../helpers/paging');
const { createToken } = require('../../helpers/generateToken');

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  register: async (req, res) => {
    try {
      const { email, emailConfirm, password } = req.body;
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        return res.status(409).json({
          errors: resultValidation.mapped(),
          oldData: { email: email, emailConfirm: emailConfirm },
        });
      }
      const userToCreate = {
        email: email,
        hashPassword: bcrypt.hashSync(password, 10),
        isAdmin: false,
        isActive: true,
      };

      const userCreated = await createUser(userToCreate);

      if (userCreated.error)
        return res.status(400).json({
          error: {
            message: userCreated.error,
            oldData: { email: email, emailConfirm: emailConfirm },
          },
        });

      return res.status(201).json({
        message: 'User created',
        data: {
          email: userCreated.email,
          isActive: userCreated.isActive,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userLoggedIn = await findOnlyUsers(undefined, email);
      if (userLoggedIn === null) {
        return res.status(401).json({
          errors: {
            email: {
              msg: 'Las credenciales no son válidas',
            },
          },
        });
      }

      const okPassword = await bcrypt.compare(password, userLoggedIn.hashPassword);
      if (!okPassword) {
        return res.status(401).json({
          errors: {
            email: {
              msg: 'Las credenciales no son válidas',
            },
          },
        });
      }

      const token = createToken(userLoggedIn.id, userLoggedIn.email, userLoggedIn.isAdmin);
      const userCleaned = await userCleaner(userLoggedIn);

      return res.status(202).json({
        message: 'User logged in successfully',
        token: token,
        data: userCleaned,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        return res.status(400).json({
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }
      const { id } = req.user;
      const dataToUpdate = {
        id: id,
        email: req.body.email ? req.body.email : null,
        hashPassword: req.body.password ? req.body.password : null,
        name: req.body.name ? req.body.name : null,
        middleName: req.body.middleName ? req.body.middleName : null,
        lastName: req.body.lastName ? req.body.lastName : null,
        phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : null,
        cellphone: req.body.cellphone ? req.body.cellphone : null,
        address: req.body.address ? req.body.address : null,
        postalCode: req.body.postalCode ? req.body.postalCode : null,
        city: req.body.city ? req.body.city : null,
        province: req.body.province ? req.body.province : null,
        avatar: req.file ? req.file.filename : null,
      };
      const userModified = await updateUser(dataToUpdate);
      if (userModified.error) {
        return res.status(401).json(userModified);
      }

      const userCleaned = await userCleaner(userModified);

      res.json({
        message: 'User updated in successfully',
        userModified: userCleaned,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      let users = await allUsers(pageOffset);
      // rows = await rows.map((user) => userCleaner(user));

      let data = {
        users,
      };

      return res.status(200).json({ message: 'User found successfully', data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await findUser(undefined, id);
      const userCleaned = await userCleaner(user);

      return res.status(200).json({
        message: 'User found it successfully',
        user: userCleaned,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  googleAuth: passport.authenticate('google', { scope: ['profile', 'email'] }),
  googleAuthCallback: passport.authenticate('google', {
    failureRedirect: '/api/v1/users/loginFailed',
    successRedirect: process.env.CLIENT_URL,
  }),
  googleFailed: (req, res) => {
    return res.status(401).json({
      success: false,
      msg: 'failure',
    });
  },

  googleSuccess: async (req, res) => {
    if (req.user) {
      return res.status(200).json({
        message: 'User logged in successfully',
        token: req.user.token,
        data: req.user,
      });
    }
  },

  logout: (req, res) => {
    const { token } = req.body;
    req.logout(function (err) {
      if (err) null;
      res.redirect(process.env.CLIENT_URL);
    });
  },
};
