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

    userData.dataValues.avatars.forEach((avatar) => {
      delete avatar.dataValues.id;
      delete avatar.dataValues.userAvatarImage;
    });

    return userData;
  },
};