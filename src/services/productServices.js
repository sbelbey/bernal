const { User, Product } = require('../database/models');

const productService = {
  addProduct: async (productData) => {
    try {
      const productCreated = await Product.create(productData);
      return productCreated;
    } catch (error) {
      return { message: error.message };
    }
  },
  findProduct: async (id) => {
    try {
      const productFound = await Product.findByPk(id, { include: { all: true } });
      return productFound;
    } catch (error) {
      return { message: error.message };
    }
  },
  changeProduct: async (productToUpdate, productData) => {
    try {
      const productModified = await productToUpdate.update(productData);
      return productModified;
    } catch (error) {
      return { message: error.message };
    }
  },
  allProducts: async (offset) => {
    try {
      const { count, rows } = await Product.findAndCountAll({
        include: { all: true },
        limit: 10,
        offset: offset,
      });

      return { count, rows };
    } catch (error) {
      return { message: error.message };
    }
  },
  addVehicle: async (productData, vehicleData) => {
    try {
      await vehicleData.forEach(async (vehicle) => {
        await productData.addVehicle(vehicle);
      });
    } catch (error) {
      console.log(error);
    }
  },
  addVehicleType: async (productData, vehicleTypeData) => {
    try {
      await productData.addVehicleType(vehicleTypeData);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productService;
