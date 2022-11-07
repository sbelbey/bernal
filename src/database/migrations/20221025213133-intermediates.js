const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cartProduct', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cartId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'cart',
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'product',
          key: 'id',
        },
      },
    });

    await queryInterface.createTable('cartUser', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      cartId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'cart',
          key: 'id',
        },
      },
    });

    await queryInterface.createTable('userAvatarImage', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      avatarImageId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'avatarImage',
          key: 'id',
        },
      },
    });

    await queryInterface.createTable('productCategory', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'product',
          key: 'id',
        },
      },
      categorytId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'category',
          key: 'id',
        },
      },
    });

    await queryInterface.createTable('productVehicleType', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'product',
          key: 'id',
        },
      },
      vehicleType: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'vehicleType',
          key: 'id',
        },
      },
    });

    await queryInterface.createTable('productVehicle', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'product',
          key: 'id',
        },
      },
      vehicleId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'vehicle',
          key: 'id',
        },
      },
    });

    await queryInterface.createTable('productStockImage', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'product',
          key: 'id',
        },
      },
      stockImageId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'stockImage',
          key: 'id',
        },
      },
    });

    await queryInterface.createTable('userVehicle', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      vehicleId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'vehicle',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cartProduct');
    await queryInterface.dropTable('cartUser');
    await queryInterface.dropTable('userAvatarImage');
    await queryInterface.dropTable('productCategory');
    await queryInterface.dropTable('productVehicleType');
    await queryInterface.dropTable('productVehicle');
    await queryInterface.dropTable('productStockImage');
    await queryInterface.dropTable('userVehicle');
  },
};
