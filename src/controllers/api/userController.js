const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { createUser, findUser, updateUser, allUsers } = require('../../services/userServices');
const { userCleaner } = require('../../helpers/dataCleaner');

module.exports = {
  register: async (req, res) => {
    try {
      const { email, emailConfirm, password } = req.body;
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        return res.status(400).json({
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
      res.status(500).send({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userLoggedIn = await findUser(email);
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

      const userForToken = {
        id: userLoggedIn.id,
        userEmail: userLoggedIn.email,
      };

      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 7,
      });

      const userCleaned = await userCleaner(userLoggedIn);

      return res.status(202).json({
        message: 'User logged in successfully',
        token: token,
        data: userCleaned,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
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
      const { id } = req;
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
      const { id } = req;
      const userToVerify = await findUser(undefined, id);

      if (!userToVerify || !userToVerify.isAdmin) {
        return res.status(401).json({
          errors: {
            msg: 'Invalid Credentials',
          },
        });
      }

      const allUsersGot = await allUsers();
      const usersCleaned = await allUsersGot.map((user) => userCleaner(user));

      return res.status(200).json(usersCleaned);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req;
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
};
