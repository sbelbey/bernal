module.exports = (sequelize, DataTypes) => {
  let cols = {
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

  let config = {
    tableName: 'stockImage',
    timestamp: false,
  };

  let StockImage = sequelize.define('StockImage', cols, config);

  StockImage.associate = (models) => {
    StockImage.belongsToMany(models.Product, {
      as: 'product',
      through: 'productStockImage',
      foreignKey: 'stockImageId',
      otherKey: 'productId',
      timestamps: false,
    });
  };
  return StockImage;
};
