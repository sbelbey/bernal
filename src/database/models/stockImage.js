module.exports = (sequelize, DataTypes) => {
  const alias = 'StockImage';
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  };

  const config = {
    tableName: 'stockImage',
    timestamp: false,
  };

  const StockImage = sequelize.define(alias, cols, config);

  StockImage.associate = (models) => {
    StockImage.belongsToMany(models.Product, {
      as: 'product',
      through: 'productStockImage',
      foreignKey: 'stockImageId',
      otherKey: 'productId',
      timestamps: false,
    });
  };
};
