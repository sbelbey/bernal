const { User, AvatarImage } = require('../database/models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const userServices = {
  createUser: async (userData) => {
    try {
      const userCreated = await User.create(userData);
      return userCreated;
    } catch (error) {
      return { message: error.message };
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
      return { message: error.message };
    }
  },
  findOnlyUsers: async (id = '', email = '') => {
    try {
      const userFound = await User.findOne({
        where: {
          [Op.or]: [{ email: email }, { id: id }],
        },
      });
      return userFound;
    } catch (error) {
      return { message: error.message };
    }
  },
  updateUser: async (userData) => {
    try {
      const { id } = userData;
      delete userData.id;

      const userToUpdate = await userServices.findOnlyUsers(id, undefined);
      if (!userToUpdate) {
        return { error: { message: 'El usuario no existe' } };
      }

      if (userData.avatar) {
        if (userToUpdate.avatars?.length > 0) {
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

      console.log('🚀 ~ file: userServices.js:76 ~ updateUser: ~ userModified', userModified);

      return userModified;
    } catch (error) {
      return { message: error.message };
    }
  },
  allUsers: async (offset) => {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      return { message: error.message };
    }
  },
};

module.exports = userServices;
