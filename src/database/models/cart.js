module.exports = (sequelize, DataTypes) => {
  const alias = 'Cart';
  const cols = {
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

  const config = {
    tableName: 'cart',
    timestamps: true,
  };

  const Cart = sequelize.define(alias, cols, config);

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
};
