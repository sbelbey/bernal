const { validationResult } = require('express-validator');
const { paging } = require('../../helpers/paging');

const {
  findVehicle,
  createVehicle,
  addProduct,
  findByPk,
  updateVehicle,
  getAll,
  getAllBrands,
  getProductByBrand,
} = require('../../services/vehicleServices');

const { findProduct } = require('../../services/productServices');

const { addType } = require('../../services/vehicleTypeServices');

const { vehicleCleaner } = require('../../helpers/dataCleaner');

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
        createdBy: req.user.id,
        updatedBy: req.user.id,
      };

      let vehicleCreated = await findVehicle(vehicleToCreate);

      if (vehicleCreated) {
        res.status(302).json({ message: 'Vehicle already exists.' });
      }
      vehicleCreated = await createVehicle(vehicleToCreate);

      //Add the products
      const productsToAdd = req.body.products
        ? req.body.products.split(',').map((product) => Object(product.trim()))
        : [];
      if (productsToAdd.length > 0) await addProduct(productsToAdd, vehicleCreated);

      return res.status(201).json({ message: 'Vehicle was created successfully', vehicle: vehicleCreated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getVehicle: async (req, res) => {
    try {
      const { id } = req.params;
      let vehicleFound = await findByPk(id);

      !req.isAdmin ? (vehicleFound = vehicleCleaner(vehicleFound)) : null;
      !vehicleFound
        ? res.status(404).json({ error: { message: 'Vehicle not found' } })
        : res.status(201).json({ message: 'Vehicle was found successfully', vehicle: vehicleFound });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  modifyVehicle: async (req, res) => {
    try {
      const { id } = req.params;
      const vehicleFound = await findByPk(id);

      if (!(vehicleFound && vehicleFound.isActive))
        return res.status(404).json({ error: { message: 'Vehicle not found' } });

      let vehicleType = req.body.type.toUpperCase();

      const vehicleToUpdate = {
        brand: req.body.brand,
        model: req.body.model,
        engine: req.body.engine,
        year: req.body.year,
        types: {
          type: vehicleType,
        },
        isActive: req.body.isActive,
        updatedBy: req.id,
      };

      const vehicleupdated = await updateVehicle(vehicleFound, vehicleToUpdate);

      return res.status(201).json({ message: 'Vehicle was update successfully', vehicle: vehicleupdated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  trahsVehicle: async (req, res) => {
    try {
      const { id } = req.params;

      const vehicleFound = await findByPk(id);

      if (!(vehicleFound && vehicleFound.isActive))
        return res.status(404).json({ error: { message: 'Vehicle not found' } });

      await updateVehicle(vehicleFound, { isActive: false, updatedBy: req.id });

      res.status(201).json({ message: 'Vehicle was deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllVehicles: async (req, res) => {
    try {
      //Get the page
      const pageOffset = req.query.page ? (req.query.page - 1) * 10 : 0;
      const page = req.query.page ?? 0;
      let { count, rows } = await getAll(pageOffset);
      !req.isAdmin ? rows.forEach((row) => vehicleCleaner(row)) : null;

      let data = {
        countItems: count,
        items: rows,
      };
      //Make de paging object
      const vehiclesData = await paging(data, page, 'vehicles');
      !vehiclesData
        ? res.status(404).json({ error: { message: 'There is nothing here' } })
        : res.status(201).json({ message: 'Vehicle was found successfully', vehicles: vehiclesData });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllBrands: async (req, res) => {
    try {
      const vehiclesBrands = await getAllBrands();
      res.status(200).json({ message: 'Brands were found successfully', vehiclesBrands });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProductByBrand: async (req, res) => {
    try {
      const brand = req.query.brand;
      const brandsProduct = await getProductByBrand(brand);
      const findProductById = async (id) => {
        const product = await findProduct(id);
        return product;
      };

      let products = [];
      brandsProduct.forEach((product) => (products = [...products, ...product.products]));
      const productsID = products.map((product) => product.id);
      products = [];
      for (let i = 0; i < productsID.length; i++) {
        products.push(await findProductById(productsID[i]));
      }
      res.status(200).json({ message: 'Products were found successfully', products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
