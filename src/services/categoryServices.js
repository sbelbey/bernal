const { Category } = require('../database/models');

categoryServices = {
  addCategoryProduct: async (userId, productId, categoryData) => {
    try {
      const categories = await categoryData.map(async (category) => {
        let categoryForC = await Category.findOrCreate({
          where: { name: category },
          defaults: { createdBy: userId, updatedBy: userId },
        });
        return categoryForC[0].addProducts(productId);
      });
      return categories;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = categoryServices;
