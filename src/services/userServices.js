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
        name: userData.name,
        middleName: userData.middleName,
        lastName: userData.lastName,
        email: userData.email,
        hashpassword: bcrypt.hashSync(userData.hashpassword, 10),
        address: userData.address,
        phoneNumber: userData.phoneNumber,
        cellphone: userData.cellphone,
        city: userData.city,
        state: userData.state,
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
