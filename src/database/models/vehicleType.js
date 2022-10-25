module.exports = (sequelize, DataTypes) => {
  const alias = 'VehicleType';
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    vehicle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  const config = {
    tableName: 'vehicleType',
    timestamps: false,
  };

  const VehicleType = sequelize.define(alias, cols, config);

  VehicleType.associate = (models) => {
    VehicleType.belongsTo(models.Vehicle, {
      as: 'vehicles',
      foreignKey: 'vehicleId',
    });

    VehicleType.belongsToMany(models.Product, {
      as: 'products',
      through: 'productVehicleType',
      foreignKey: 'vehicleTypeId',
      otherKey: 'productId',
      timestamps: false,
    });
  };
};
