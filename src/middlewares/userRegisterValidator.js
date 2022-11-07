const { check } = require('express-validator');
const { findUser } = require('../services/userServices');
const path = require('path');

module.exports = [
  check('email')
    .notEmpty()
    .withMessage('Introduce a valid email address.')
    .isEmail()
    .withMessage('Introduce a valid email address.')
    .custom(async (value) => {
      const email = await findUser(value);
      if (email) throw new Error('The email address is already registered.');
    })
    .normalizeEmail(),
  check('emailConfirm')
    .notEmpty()
    .withMessage('Should confirm your email.')
    .isEmail()
    .withMessage('Introduce a valid email address.')
    .custom(async (value, { req }) => {
      if (req.body.email != value) {
        throw new Error('The email address must be equal to the provided.');
      }
      return true;
    })
    .normalizeEmail(),
  check('password')
    .notEmpty()
    .withMessage('Debe ingresar una contraseña')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe contener al menos 8 caracteres')
    .isStrongPassword()
    .withMessage('No es una contraseña lo suficientemente fuerte'),
  check('passwordConfirm')
    .notEmpty()
    .withMessage('Debe ingresar una contraseña')
    .custom(async (value, { req }) => {
      if (req.body.password !== value) {
        throw new Error('La contraseña debe ser igual a la anterior');
      }
      return true;
    }),
];
