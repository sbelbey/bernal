const { StockImage } = require('../database/models');

const stockImagesService = {
  addProductImages: async (productId, imageData) => {
    try {
      let imageStorage;
      await imageData.forEach(async (stockImage) => {
        imageStorage = await StockImage.create(stockImage);
        imageStorage.addProduct(productId);
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = stockImagesService;
