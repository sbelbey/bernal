module.exports = (sequelize, DataTypes) => {
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    brand: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    engine: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    year: {
      type: DataTypes.DATE,
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
    tableName: 'vehicle',
    timestamps: true,
  };

  let Vehicle = sequelize.define('Vehicle', cols, config);

  Vehicle.associate = (models) => {
    Vehicle.belongsTo(models.User, {
      as: 'created_by',
      foreignKey: 'createdBy',
    });

    Vehicle.belongsTo(models.User, {
      as: 'updated_by',
      foreignKey: 'updatedBy',
    });

    Vehicle.hasMany(models.VehicleType, {
      as: 'type',
      foreignKey: 'vehicleId',
    });

    Vehicle.belongsToMany(models.User, {
      as: 'users',
      through: 'userVehicle',
      foreignKey: 'vehicleId',
      otherKey: 'userId',
      timestamps: false,
    });

    Vehicle.belongsToMany(models.Product, {
      as: 'products',
      through: 'productVehicle',
      foreignKey: 'vehicleId',
      otherKey: 'productId',
      timestamps: false,
    });
  };
  return Vehicle;
};
