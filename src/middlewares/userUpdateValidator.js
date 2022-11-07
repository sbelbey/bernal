const { check } = require('express-validator');
const { findUser } = require('../services/userServices');
const path = require('path');

module.exports = [
  check('email')
    .isEmail()
    .withMessage('Introduce a valid email address.')
    .custom(async (value, { req }) => {
      console.log(value);
      const usedMail = await findUser(value);
      if (usedMail && usedMail.id !== req.id) {
        throw new Error('The email address is already registered.');
      }
    })
    .normalizeEmail(),
  check('password')
    .isLength({ min: 8 })
    .withMessage('The password must be at least 8 characters long.')
    .isStrongPassword()
    .withMessage('The password is not strong enough.'),
  check('name').trim().escape(),
  check('middleName').trim().escape(),
  check('lastName').trim().escape(),
  check('phoneNumber').isLength({ min: 8 }).withMessage('The phone number must be at least 8 characters long.'),
  check('cellphone')
    .isLength({ min: 8 })
    .withMessage('The phone number must be at least 8 characters long.')
    .trim()
    .escape(),
  check('address').isLength({ min: 8 }).withMessage('The adress must be at least 8 characters long.'),
  check('postalCode').isLength({ min: 4 }).withMessage('The postal code must be at least 4 characters long.'),
  check('city').isLength({ min: 4 }).withMessage('The city name must be at least 4 characters long.').trim().escape(),
  check('province')
    .isLength({ min: 4 })
    .withMessage('The province must be at least 4 characters long.')
    .trim()
    .escape(),
  check('avatar')
    .custom(async (value, { req }) => {
      if (!req.file) {
        return true;
      }
      if (!req.file.hasOwnProperty('filename')) {
        return true;
      }
      const extention = path.extname(req.file.originalname);
      switch (extention) {
        case '.jpg':
          return '.jpg';
        case '.jpeg':
          return '.jpeg';
        case '.png':
          return '.png';
        case '.gif':
          return '.gif';
        default:
          return false;
      }
    })
    .withMessage('Por favor, sube una imagen de extensión jpg, jpeg, png o gif'),
];