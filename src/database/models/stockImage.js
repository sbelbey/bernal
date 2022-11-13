module.exports = (sequelize, DataTypes) => {
  let cols = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    timestamps: false,
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
