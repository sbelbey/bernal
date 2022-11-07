module.exports = (sequelize, DataTypes) => {
  let cols = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  };

  let config = {
    tableName: 'avatarImage',
    timestamps: false,
  };

  let AvatarImage = sequelize.define('AvatarImage', cols, config);

  AvatarImage.associate = (models) => {
    AvatarImage.belongsToMany(models.User, {
      as: 'user',
      through: 'userAvatarImage',
      foreignKey: 'avatarImageId',
      otherKey: 'userId',
      timestamps: false,
    });
  };
  return AvatarImage;
};
