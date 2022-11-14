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
  findProductImages: async (product) => {
    try {
      const prductImages = await product.getImages();
      return prductImages;
    } catch (error) {
      console.log(error);
    }
  },
  deleteProductImages: async (productId, imagesToDelete) => {
    try {
      await imagesToDelete.forEach(async (image) => {
        await image.removeProduct(productId);
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = stockImagesService;
