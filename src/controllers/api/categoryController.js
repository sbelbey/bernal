const { allCategories } = require('../../services/categoryServices');

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      let categoriesFound = await allCategories();
      res.status(200).json({ message: 'Categories was found successfully', categories: categoriesFound });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
