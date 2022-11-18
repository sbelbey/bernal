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
};
