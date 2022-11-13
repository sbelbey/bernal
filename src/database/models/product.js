module.exports = (sequelize, DataTypes) => {
  let cols = {
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
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    width: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    length: {
      type: DataTypes.DECIMAL(5, 2),
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
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedBy: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  };

  let config = {
    tableName: 'product',
    timestamps: true,
  };

  let Product = sequelize.define('Product', cols, config);

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      as: 'created_by',
      foreignKey: 'createdBy',
    });

    Product.belongsTo(models.User, {
      as: 'updated_by',
      foreignKey: 'updatedBy',
    });

    Product.belongsToMany(models.Category, {
      as: 'categories',
      through: 'productCategory',
      foreignKey: 'productId',
      otherKey: 'categoryId',
      timestamps: false,
    });

    Product.belongsToMany(models.Vehicle, {
      as: 'vehicles',
      through: 'productVehicle',
      foreignKey: 'productId',
      otherKey: 'vehicleId',
      timestamps: false,
    });

    Product.belongsToMany(models.VehicleType, {
      as: 'vehicleType',
      through: 'productVehicleType',
      foreignKey: 'productId',
      otherKey: 'vehicleTypeId',
      timestamps: false,
    });

    Product.belongsToMany(models.StockImage, {
      as: 'images',
      through: 'productStockImage',
      foreignKey: 'productId',
      otherKey: 'stockImageId',
      timestamps: false,
    });

    Product.belongsToMany(models.Cart, {
      as: 'carts',
      through: 'cartProduct',
      foreignKey: 'productId',
      otherKey: 'cartId',
      timestamps: false,
    });
  };
  return Product;
};
