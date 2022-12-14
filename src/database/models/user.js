module.exports = (sequelize, DataTypes) => {
  let cols = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    middleName: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    hashPassword: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT(255),
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.BIGINT(20),
      allowNull: true,
    },
    cellphone: {
      type: DataTypes.BIGINT(20),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(20),
      allowNul: true,
    },
    province: {
      type: DataTypes.STRING(20),
      allowNul: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN(false),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN(true),
      allowNull: false,
    },
  };

  let config = {
    tableName: 'user',
    timestamps: false,
  };

  let User = sequelize.define('User', cols, config);

  User.associate = (models) => {
    User.hasMany(models.Product, {
      as: 'productCreated',
      foreignKey: 'createdBy',
    });

    User.hasMany(models.Product, {
      as: 'productUpdated',
      foreignKey: 'updatedBy',
    });

    User.hasMany(models.Category, {
      as: 'categoryCreated',
      foreignKey: 'createdBy',
    });

    User.hasMany(models.Category, {
      as: 'categoryUpdated',
      foreignKey: 'updatedBy',
    });

    User.hasMany(models.Vehicle, {
      as: 'vehicleCreated',
      foreignKey: 'createdBy',
    });

    User.hasMany(models.Vehicle, {
      as: 'vehicleUpdated',
      foreignKey: 'updatedBy',
    });

    User.hasMany(models.Cart, {
      as: 'cartCreated',
      foreignKey: 'createdBy',
    });

    User.hasMany(models.Cart, {
      as: 'cartUpdated',
      foreignKey: 'updatedBy',
    });

    User.belongsToMany(models.Vehicle, {
      as: 'userVehicles',
      through: 'userVehicle',
      foreignKey: 'userId',
      otherKey: 'vehicleId',
      timestamps: false,
    });

    User.belongsToMany(models.Cart, {
      as: 'carts',
      through: 'cartUser',
      foreignKey: 'userId',
      otherKey: 'cartId',
      timestamps: false,
    });

    User.belongsToMany(models.AvatarImage, {
      as: 'avatars',
      through: 'userAvatarImage',
      foreignKey: 'userId',
      otherKey: 'avatarImageId',
      timestamps: false,
    });
  };
  return User;
};
