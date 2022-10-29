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
