const { check } = require('express-validator');
const path = require('path');

module.exports = [
  check('name')
    .optional()
    .isLength({ max: 40 })
    .withMessage('The product name must not be greater than 40 characters.')
    .trim()
    .escape(),
  check('brand')
    .optional()
    .isLength({ max: 40 })
    .withMessage('The brand must not be greater than 40 characters.')
    .trim()
    .escape(),
  check('model')
    .isLength({ max: 40 })
    .withMessage('The model must not be greater than 40 characters.')
    .trim()
    .escape()
    .optional(),
  check('price')
    .optional()
    .isFloat()
    .withMessage('The price must be a number')
    .isCurrency()
    .withMessage('El precio no es un precio valido')
    .toFloat(),
  check('description')
    .optional()
    .isLength({ min: 20 })
    .withMessage('The description must be at least 20 characters long.')
    .trim()
    .escape(),
  check('origin')
    .optional()
    .isLength({ max: 10 })
    .withMessage('The origin must not be greater than 10 characters long.')
    .trim()
    .escape(),
  check('maintenanceFree').isBoolean().withMessage('Must provide a boolean value.').optional().toBoolean(),
  check('waranty').optional().isInt().withMessage('Must provide an integer value.').toInt(),
  check('voltage').isInt().withMessage('Must provide an integer value.').toInt().optional(),
  check('capacity').isInt().withMessage('Must provide an integer value.').toInt().optional(),
  check('height').isFloat().withMessage('Must provide an float value.').toFloat().optional(),
  check('width').isFloat().withMessage('Must provide an float value.').toFloat().optional(),
  check('length').isFloat().withMessage('Must provide an float value.').toFloat().optional(),
  check('stock').optional().isInt().withMessage('Must provide an integer value.').toInt(),
  check('isActive').isBoolean().withMessage('Must provide a boolean value.').optional().toBoolean(),
  check('categories')
    .optional()
    .isLength({ max: 40 })
    .withMessage('The category must not be greater than 40 characters.')
    .trim()
    .escape(),
  check('images')
    .custom((value, { req }) => {
      console.log('🚀 ~ file: productUpdate.js:84 ~ .custom ~ req:', req);
      let image = req.files.map((file) => {
        let imagen = file.filename;
        let extension = path.extname(imagen);
        switch (extension) {
          case '.jpg':
            return true;
          case '.jpeg':
            return true;
          case '.png':
            return true;
          case '.gif':
            return true;
          case '.svg':
            return true;
          default:
            return false;
        }
      });
      if (image.includes(false)) {
        throw new Error('The images must be jpg, jpeg, png, svg or gif.');
      }
      return true;
    })
    .withMessage('The images must be jpg, jpeg, png, svg or gif.')
    .optional(),

  check('vehicles')
    .custom((value) => {
      let val = value.split(',').map((vehicle) => {
        let regex = new RegExp(
          '^(?:[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12})|(?:0{8}-0{4}-0{4}-0{4}-0{12})$'
        );
        let isUUID = regex.test(vehicle);
        return isUUID;
      });
      return val.includes(true);
    })
    .withMessage('Must to provide a UUID for the vehicle')
    .custom((value) => {
      value.split(',').forEach((vehicle) => {
        vehicle.trim();
      });
      return true;
    })
    .optional(),
];
