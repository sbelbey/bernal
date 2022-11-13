const { User, Product } = require('../database/models');
const { Op } = require('sequelize');

const productService = {
  addProduct: async (productData) => {
    try {
      const productCreated = await Product.create(productData);
      return productCreated;
    } catch (error) {
      console.log(error);
    }
  },
  findProduct: async (id) => {
    try {
      const productFound = await Product.findOne({
        where: {
          id: id,
        },
        // include: { all: true },
      });
      return productFound;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productService;
