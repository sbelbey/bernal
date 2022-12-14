const { check } = require('express-validator');

module.exports = [
  check('brand')
    .isLength({ max: 40 })
    .withMessage('The brand must not be greater than 40 characters.')
    .trim()
    .escape()
    .optional(),
  check('model')
    .isLength({ max: 40 })
    .withMessage('The model must not be greater than 40 characters.')
    .trim()
    .escape()
    .optional(),
  check('engine')
    .isLength({ max: 40 })
    .withMessage('The engine must not be greater than 40 characters.')
    .trim()
    .escape()
    .optional(),
  check('year').optional().isDate().withMessage('The year must be a datetime type').toDate(),
  check('type')
    .isLength({ max: 20 })
    .withMessage('The type must not be greater than 20 characters.')
    .trim()
    .escape()
    .optional(),
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
