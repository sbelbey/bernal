const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      midleName: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(80),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      hasPassword: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      cellphone: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(20),
        allowNul: true,
      },
      province: {
        type: DataTypes.STRING(20),
        allowNul: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN(false),
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN(true),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  },
};
