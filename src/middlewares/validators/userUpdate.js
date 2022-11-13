const { check } = require('express-validator');
const { findUser } = require('../../services/userServices');
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
    .normalizeEmail()
    .optional(),
  check('password')
    .isLength({ min: 8 })
    .withMessage('The password must be at least 8 characters long.')
    .isStrongPassword()
    .withMessage('The password is not strong enough.')
    .optional(),
  check('name').trim().escape().optional(),
  check('middleName').trim().escape().optional(),
  check('lastName').trim().escape().optional(),
  check('phoneNumber')
    .isLength({ min: 8 })
    .withMessage('The phone number must be at least 8 characters long.')
    .optional(),
  check('cellphone')
    .isLength({ min: 8 })
    .withMessage('The phone number must be at least 8 characters long.')
    .trim()
    .escape()
    .optional(),
  check('address').isLength({ min: 8 }).withMessage('The adress must be at least 8 characters long.').optional(),
  check('postalCode')
    .isLength({ min: 4 })
    .withMessage('The postal code must be at least 4 characters long.')
    .optional(),
  check('city')
    .isLength({ min: 4 })
    .withMessage('The city name must be at least 4 characters long.')
    .trim()
    .escape()
    .optional(),
  check('province')
    .isLength({ min: 4 })
    .withMessage('The province must be at least 4 characters long.')
    .trim()
    .escape()
    .optional(),
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
          return true;
        case '.jpeg':
          return true;
        case '.png':
          return true;
        case '.gif':
          return true;
        default:
          throw new Error('The images must be jpg, jpeg, png or gif.');
      }
    })
    .withMessage('The images must be jpg, jpeg, png or gif'),
];
