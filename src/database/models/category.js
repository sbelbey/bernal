module.exports = (sequelize, DataTypes) => {
  const alias = 'Category';
  const cols = {
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

  const config = {
    tableName: 'category',
    timestamps: true,
  };

  const Category = sequelize.define(alias, cols, config);

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
};
