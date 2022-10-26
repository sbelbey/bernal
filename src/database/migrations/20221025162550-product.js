const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      maintenanceFree: {
        type: DataTypes.BOOLEAN(false),
        allowNull: true,
      },
      waranty: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
      },
      voltage: {
        type: DataTypes.INTEGER(2),
        allowNull: true,
      },
      capacity: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      height: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      width: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      length: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN(true),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product');
  },
};
