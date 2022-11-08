const { User, AvatarImage } = require('../database/models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const userServices = {
  createUser: async (userData) => {
    try {
      const userCreated = await User.create(userData);
      return userCreated;
    } catch (error) {
      return { error };
    }
  },
  findUser: async (email = '', id = '') => {
    try {
      const userFound = await User.findOne({
        where: {
          [Op.or]: [{ email: email }, { id: id }],
        },
        include: { all: true },
      });

      return userFound;
    } catch (error) {
      return { error };
    }
  },
  updateUser: async (userData) => {
    try {
      const { id } = userData;
      delete userData.id;

      const userToUpdate = await userServices.findUser(undefined, id);
      if (!userToUpdate) {
        return { error: { message: 'El usuario no existe' } };
      }

      if (userData.avatar) {
        if (userToUpdate.avatars.length > 0) {
          const avatarToDelete = await AvatarImage.findByPk(userToUpdate.avatars[0].dataValues.id);
          avatarToDelete.removeUser(userToUpdate.id);
          avatarToDelete.destroy();
        }

        const image = await AvatarImage.create({
          name: userData.avatar,
          url: userData.avatar,
        });

        await image.addUser(userToUpdate.id);
      }

      let userModified = await userToUpdate.update({
        name: userData.name ?? userToUpdate.name,
        middleName: userData.middleName ?? userToUpdate.middleName,
        lastName: userData.lastName ?? userToUpdate.lastName,
        email: userData.email ?? userToUpdate.email,
        hashPassword: userData.hashPassword ? bcrypt.hashSync(userData.hashPassword, 10) : userToUpdate.hashPassword,
        address: userData.address ?? userToUpdate.address,
        phoneNumber: userData.phoneNumber ?? userToUpdate.phoneNumber,
        cellphone: userData.cellphone ?? userToUpdate.cellphone,
        city: userData.city ?? userToUpdate.city,
        province: userData.province ?? userToUpdate.province,
      });

      return userModified;
    } catch (error) {
      return { message: error.message };
    }
  },
  allUsers: async () => {
    try {
      const allUsers = await User.findAll({ include: { all: true } });
      return allUsers;
    } catch (error) {
      return { error };
    }
  },
};

module.exports = userServices;
