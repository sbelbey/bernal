const { validationResult } = require('express-validator');

const { findVehicle, createVehicle, addProduct } = require('../../services/vehicleServices');
const { addType } = require('../../services/vehicleTypeServices');

module.exports = {
  vehicleCreate: async (req, res) => {
    try {
      // Catch and show all validations errors.
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        return res.status(400).json({
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }

      let vehicleType = req.body.type.toUpperCase();

      // Create the vehicle object
      const vehicleToCreate = {
        brand: req.body.brand,
        model: req.body.model,
        engine: req.body.engine,
        year: req.body.year,
        types: {
          type: vehicleType,
        },
        isActive: true,
        createdBy: req.id,
        updatedBy: req.id,
      };

      let vehicleCreated = await findVehicle(vehicleToCreate);

      if (vehicleCreated) {
        res.status(302).json({ message: 'Vehicle already exists.' });
      }
      vehicleCreated = await createVehicle(vehicleToCreate);
      
      //Add the products
      const productsToAdd = req.body.products.split(',').map((product) => Object(product.trim()));
      await addProduct(productsToAdd, vehicleCreated);

      return res.status(201).json({ message: 'Vehicle was created successfully', vehicle: vehicleCreated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
