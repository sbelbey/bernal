const { check } = require('express-validator');
const { findOnlyUsers } = require('../../services/userServices');
const path = require('path');

module.exports = [
  check('email')
    .isEmail()
    .withMessage('Introduce a valid email address.')
    .custom(async (value, { req }) => {
      try {
        const usedMail = await findOnlyUsers(null, value);

        if (usedMail && usedMail.id !== req.user.id) {
          throw new Error('The email address is already registered.');
        }
      } catch (error) {
        console.log(error);
      }
    })
    .normalizeEmail()
    .optional(),
  check('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('The password must be at least 8 characters long.')
    .isStrongPassword()
    .withMessage('The password is not strong enough.'),
  check('name').optional().trim().escape(),
  check('middleName').optional().trim().escape(),
  check('lastName').optional().trim().escape(),
  check('phoneNumber')
    .optional()
    .isLength({ min: 8 })
    .withMessage('The phone number must be at least 8 characters long.'),
  check('cellphone')
    .optional()
    .isLength({ min: 8 })
    .withMessage('The phone number must be at least 8 characters long.')
    .trim()
    .escape(),
  check('address').optional().isLength({ min: 8 }).withMessage('The adress must be at least 8 characters long.'),

  check('city')
    .optional()
    .isLength({ min: 4 })
    .withMessage('The city name must be at least 4 characters long.')
    .trim()
    .escape(),
  check('province')
    .optional()
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
