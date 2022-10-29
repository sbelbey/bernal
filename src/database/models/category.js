module.exports = (sequelize, DataTypes) => {
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: 'category',
    timestamps: true,
  };

  let Category = sequelize.define('Category', cols, config);

  Category.associate = (models) => {
    Category.belongsTo(models.User, {
      as: 'created_by',
      foreignKey: 'createdBy',
    });

    Category.belongsTo(models.User, {
      as: 'updated_by',
      foreignKey: 'updatedBy',
    });

    Category.belongsToMany(models.Product, {
      as: 'products',
      through: 'productCategory',
      foreignKey: 'categoryId',
      otherKey: 'productId',
      timestamps: false,
    });
  };
  return Category;
};
