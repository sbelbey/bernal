module.exports = (sequelize, DataTypes) => {
  let cols = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      as: 'types',
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
