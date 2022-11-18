const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { findOnlyUsers } = require('../../services/userServices');
const { addProduct, findProduct, changeProduct, allProducts } = require('../../services/productServices');
const { addProductImages, deleteProductImages, findProductImages } = require('../../services/stockImagesServices');
const {
  addCategoryProduct,
  deleteProductCategories,
  findProductCategories,
} = require('../../services/categoryServices');

const { productCleaner } = require('../../helpers/dataCleaner');
const { paging } = require('../../helpers/paging');

const imagesObjectConstractor = require('../../helpers/imagesObjectConstractor');

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

      res.status(201).json({ message: 'Product was created successfully', product: productWithImages });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.id;
      const productToUpdate = await findProduct(id);

      if (!productToUpdate) return res.status(404).json({ error: { msg: 'Product not found' } });

      const updateData = {
        name: req.body.name ?? productToUpdate.name,
        brand: req.body.brand ?? productToUpdate.brand,
        model: req.body.model ?? productToUpdate.model,
        price: req.body.price ?? productToUpdate.price,
        description: req.body.description ?? productToUpdate.description,
        origin: req.body.origin ?? productToUpdate.origin,
        maintenanceFree: req.body.maintenanceFree ?? productToUpdate.maintenanceFree,
        waranty: req.body.waranty ?? productToUpdate.waranty,
        voltage: req.body.voltage ?? productToUpdate.voltage,
        capacity: req.body.capacity ?? productToUpdate.capacity,
        height: req.body.height ?? productToUpdate.height,
        width: req.body.width ?? productToUpdate.width,
        length: req.body.length ?? productToUpdate.length,
        stock: req.body.stock ?? productToUpdate.stock,
        isActive: req.body.isActive ?? productToUpdate.isActive,
        updatedBy: userId,
      };

      //Update the product images if the client changed it.
      if (req.files.length > 0) {
        const images = imagesObjectConstractor(req.files);
        const productImagesToDelete = await findProductImages(updatedProduct);
        await deleteProductImages(id, productImagesToDelete);
        await addProductImages(id, images);
      }
      //Update the product categories if the client changed it.
      if (req.body.categories) {
        const categories = req.body.categories.toLowerCase().split(',');
        const productCategoriesToDelete = await findProductCategories(updatedProduct);
        await deleteProductCategories(id, productCategoriesToDelete);
        await addCategoryProduct(userId, id, categories);
      }

      const updatedProduct = await changeProduct(productToUpdate, updateData);

      return res.status(202).json({ message: 'Product updated successfully', Product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const productToDelete = await findProduct(id);

      if (!productToDelete || !productToDelete.isActive)
        return res.status(404).json({ error: { message: 'Product not found' } });

      const deleteData = {
        isActive: false,
      };

      const productDeleted = await changeProduct(productToDelete, deleteData);

      return res.status(202).json({ message: 'Product was deleted successfully', productId: id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProduct: async (req, res) => {
    try {
      //Get product information
      const { id } = req.params;
      let productFound = await findProduct(id);

      //Get user token
      const authorization = req.get('authorization');
      let token = '';
      if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
      }

      //Decoding the token
      let decodedToken = {};
      try {
        decodedToken = jwt.verify(token, process.env.SECRET);
      } catch (error) {
        console.log(error);
      }

      const user = await findOnlyUsers(decodedToken.id);

      //Looking the product
      if (!productFound || !productFound.isActive)
        return res.status(404).json({ error: { message: 'Product not found' } });

      //Clean the product data for no admin users
      if (!token || !decodedToken.id || !user.isAdmin) productFound = productCleaner(productFound);

      return res.status(200).json({ message: 'Product was found successfully', product: productFound });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllProduct: async (req, res) => {
    try {
      //Get the page
      const pageOffset = req.query.page ? (req.query.page - 1) * 10 : 0;
      const page = req.query.page ?? 0;

      //Get the products information
      let { count, rows } = await allProducts(pageOffset);

      //Get user token
      const authorization = req.get('authorization');
      let token = '';
      if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
      }

      //Decoding the token
      let decodedToken = {};
      try {
        decodedToken = jwt.verify(token, process.env.SECRET);
      } catch (error) {
        console.log(error);
      }

      const user = await findOnlyUsers(decodedToken.id);

      if (!token || !decodedToken.id || !user.isAdmin) rows.forEach((row) => productCleaner(row));

      let data = {
        countItems: count,
        items: rows,
      };

      //Make de paging object
      const productsData = await paging(data, page, 'products');

      return res.status(200).json(productsData);
    } catch (error) {
      console.log(error);
    }
  },
};
