const { check } = require('express-validator');
const path = require('path');

module.exports = [
  check('brand')
    .notEmpty()
    .withMessage('Have to provide a brand')
    .isLength({ max: 40 })
    .withMessage('The brand must not be greater than 40 characters.')
    .trim()
    .escape(),
  check('model')
    .notEmpty()
    .withMessage('Have to provide a model')
    .isLength({ max: 40 })
    .withMessage('The model must not be greater than 40 characters.')
    .trim()
    .escape(),
  check('engine')
    .notEmpty()
    .withMessage('Have to provide an engine')
    .isLength({ max: 40 })
    .withMessage('The engine must not be greater than 40 characters.')
    .trim()
    .escape(),
  check('year').optional().isDate().withMessage('The year must be a datetime type').toDate(),
  check('type')
    .notEmpty()
    .withMessage('Have to provide an engine')
    .isLength({ max: 20 })
    .withMessage('The type must not be greater than 20 characters.')
    .trim()
    .escape(),
  check('products')
    .custom((value) => {
      let val = value.split(',').map((product) => {
        product = product.trim();
        let regex = new RegExp(
          '^(?:[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12})|(?:0{8}-0{4}-0{4}-0{4}-0{12})$'
        );
        let isUUID = regex.test(product);
        return isUUID;
      });
      return !val.includes(false);
    })
    .withMessage('Must to provide a UUID for the product')
    .custom((value) => {
      value.split(',').forEach((vehicle) => {
        vehicle.trim();
      });
      return true;
    })
    .optional(),
];
