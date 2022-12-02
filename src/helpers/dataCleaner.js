module.exports = {
  userCleaner: (userData) => {
    if (!userData.isAdmin) {
      delete userData.dataValues.productCreated;
      delete userData.dataValues.productUpdated;
      delete userData.dataValues.categoryCreated;
      delete userData.dataValues.categoryUpdated;
      delete userData.dataValues.vehicleCreated;
      delete userData.dataValues.vehicleUpdated;
    }

    delete userData.dataValues.hashPassword;
    delete userData.dataValues.isAdmin;
    delete userData.dataValues.isActive;
    delete userData.dataValues.id;
    delete userData.dataValues.cartUpdated;
    delete userData.dataValues.cartCreated;

    userData.dataValues.avatars
      ? userData.dataValues.avatars.forEach((avatar) => {
          delete avatar.dataValues.id;
          delete avatar.dataValues.userAvatarImage;
        })
      : null;

    return userData;
  },
  productCleaner: (productData) => {
    delete productData.dataValues.isActive;
    delete productData.dataValues.createdAt;
    delete productData.dataValues.createdBy;
    delete productData.dataValues.updatedAt;
    delete productData.dataValues.updatedBy;

    return productData;
  },
  vehicleCleaner: (vehicleData) => {
    delete vehicleData.dataValues.createdAt;
    delete vehicleData.dataValues.createdBy;
    delete vehicleData.dataValues.updatedAt;
    delete vehicleData.dataValues.updatedBy;
    delete vehicleData.dataValues.created_by;
    delete vehicleData.dataValues.updated_by;
    delete vehicleData.dataValues.users;
    vehicleData.dataValues.products.map((product) => {
      delete product.dataValues.isActive;
      delete product.dataValues.createdAt;
      delete product.dataValues.createdBy;
      delete product.dataValues.updatedAt;
      delete product.dataValues.updatedBy;
    });

    return vehicleData;
  },
};
