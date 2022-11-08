const { check } = require('express-validator');
const { findUser } = require('../../services/userServices');
const path = require('path');

module.exports = [
  check('name')
    .notEmpty()
    .withMessage('Have to provide a name')
    .isLength({ max: 40 })
    .withMessage('The product name must not be greater than 40 characters.')
    .trim()
    .escape(),
  check('brand')
    .notEmpty()
    .withMessage('Have to provide a brand')
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
    .notEmpty()
    .withMessage('Have to provide a price')
    .isFloat()
    .withMessage('The price must be a number')
    .isCurrency()
    .withMessage('El precio no es un precio valido')
    .toFloat(),
  check('description')
    .notEmpty()
    .withMessage('Have to provide a description')
    .isLength({ min: 20 })
    .withMessage('The description must be at least 20 characters long.')
    .trim()
    .escape(),
  check('origin')
    .notEmpty()
    .withMessage('Have to provide an origin')
    .isLength({ max: 10 })
    .withMessage('The origin must not be greater than 10 characters long.')
    .trim()
    .escape(),
  check('maintenanceFree').isBoolean().withMessage('Must provide a boolean value.').optional().toBoolean(),
  check('waranty')
    .notEmpty()
    .withMessage('Must provide the number of months of warranty.')
    .isInt()
    .withMessage('Must provide an integer value.')
    .toInt(),
  check('voltage').isInt().withMessage('Must provide an integer value.').toInt().optional(),
  check('capacity').isInt().withMessage('Must provide an integer value.').toInt().optional(),
  check('height').isFloat().withMessage('Must provide an float value.').toFloat().optional(),
  check('width').isFloat().withMessage('Must provide an float value.').toFloat().optional(),
  check('length').isFloat().withMessage('Must provide an float value.').toFloat().optional(),
  check('stock').notEmpty().isInt().withMessage('Must provide an integer value.').toInt(),
  check('isActive').isBoolean().withMessage('Must provide a boolean value.').optional().toBoolean(),
  check('images')
    .custom((value, { req }) => {
      req.files.forEach((file) => {
        let imagen = file.filename;
        let extension = path.extname(imagen);
        switch (extension) {
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
      });
    })
    .withMessage('The images must be jpg, jpeg, png or gif')
    .optional(),
  check('categories')
  .
];

//     "category": "Autos",
//     "Vehicles": [
//         {
//             "Brand": "Peugeot",
//             "Model": "408",
//             "Engine": "H.D.I. 1.6",
//             "Year": "2018"
//         },
//         {
//             "Brand": "Fiat",
//             "Model": "Uno",
//             "Engine": "1.3 Nafta",
//             "Year": "2010"
//         }
//     ]
// }
