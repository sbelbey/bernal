module.exports = (sequelize, DataTypes) => {
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  };

  let config = {
    tableName: 'cart',
    timestamps: true,
  };

  let Cart = sequelize.define('Cart', cols, config);

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      as: 'created_by',
      foreignKey: 'createdBy',
    });

    Cart.belongsTo(models.User, {
      as: 'updated_by',
      foreignKey: 'updatedBy',
    });

    Cart.belongsToMany(models.User, {
      as: 'userCart',
      through: 'cartUser',
      foreignKey: 'cartId',
      otherKey: 'userId',
      timestamps: false,
    });

    Cart.belongsToMany(models.Product, {
      as: 'products',
      through: 'cartProduct',
      foreignKey: 'cartId',
      otherKey: 'productId',
      timestamps: false,
    });
  };
  return Cart;
};
