const { Vehicle } = require('../database/models');
const { VehicleType } = require('../database/models');

const { Op } = require('Sequelize');

module.exports = {
  findVehicle: async (vehicleData) => {
    try {
      const vehicleFound = await Vehicle.findOne({
        where: {
          [Op.and]: [
            { brand: vehicleData.brand },
            { model: vehicleData.model },
            { engine: vehicleData.engine },
            { year: vehicleData.year },
            { isActive: true },
          ],
        },
        include: { all: true },
      });
      return vehicleFound;
    } catch (error) {
      console.log(error);
    }
  },
  createVehicle: async (vehicleData) => {
    try {
      const vehicleCreated = await Vehicle.create(vehicleData, { include: 'types' });
      return vehicleCreated;
    } catch (error) {
      console.log(error);
    }
  },
  addProduct: async (productData, vehicleData) => {
    try {
      await productData.forEach(async (product) => {
        await vehicleData.addProduct(product);
      });
    } catch (error) {
      console.log(error);
    }
  },
  findByPk: async (vehicleId) => {
    try {
      const vehicle = await Vehicle.findOne({
        where: {
          [Op.and]: [{ isActive: true }, { id: vehicleId }],
        },
        include: { all: true },
      });
      return vehicle;
    } catch (error) {
      console.log(error);
    }
  },
  updateVehicle: async (vehicleToUpdate, vehicleNewData) => {
    try {
      const vehicleUpdated = await vehicleToUpdate.update(vehicleNewData, { include: 'types' });
      return vehicleUpdated;
    } catch (error) {
      return { message: error.message };
    }
  },
  getAll: async (offset) => {
    try {
      const { count, rows } = await Vehicle.findAndCountAll({
        include: { all: true },
        limit: 10,
        offset: offset,
      });

      return { count, rows };
    } catch (error) {
      return { message: error.message };
    }
  },
  getAllBrands: async () => {
    try {
      const allBrands = await Vehicle.findAll({ attributes: ['brand'] });
      return allBrands;
    } catch (error) {
      return { message: error.message };
    }
  },
  getProductByBrand: async (brand) => {
    try {
      const producsByBrand = await Vehicle.findAll({ where: { brand: brand }, include: { all: true } });
      return producsByBrand;
    } catch (error) {
      return { message: error.message };
    }
  },
};
