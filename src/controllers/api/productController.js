const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { findUser } = require('../../services/userServices');
const { addProduct, findProduct } = require('../../services/productServices');
const { addProductImages } = require('../../services/stockImagesServices');
const { addCategoryProduct } = require('../../services/categoryServices');

module.exports = {
  productCreate: async (req, res) => {
    try {
      // Catch and show all validations errors.
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        return res.status(400).json({
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }

      // Create all the objects needed to add a new product.
      const { id } = req;
      const productToCreate = {
        name: req.body.name,
        brand: req.body.brand,
        model: req.body.model ?? null,
        price: req.body.price,
        description: req.body.description,
        origin: req.body.origin,
        maintenanceFree: req.body.maintenanceFree ?? null,
        waranty: req.body.waranty,
        voltage: req.body.voltage ?? null,
        capacity: req.body.capacity ?? null,
        height: req.body.height ?? null,
        width: req.body.width ?? null,
        length: req.body.length ?? null,
        stock: req.body.stock,
        isActive: req.body.isActive ?? true,
        categories: req.body.categories,
        createdBy: id,
        updatedBy: id,
        // vehicles: req.body.vehicles ?? null,
      };

      const images = req.files
        ? req.files.map((image) => {
            return Object({
              url: image.filename,
              name: image.filename,
            });
          })
        : null;

      const categories = req.body.categories.toLowerCase().split(',');

      // Create the product with all it relations.
      const productCreated = await addProduct(productToCreate);
      await addCategoryProduct(id, productCreated.id, categories);
      await addProductImages(productCreated.id, images);

      // Get the product created.
      const productWithImages = await findProduct(productCreated.id);

      res.status(200).json({ data: productWithImages });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateProduct
};
