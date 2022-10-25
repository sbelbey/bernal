module.exports = (sequelize, DataTypes) => {
  const alias = 'AvatarImage';
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
    tableName: 'avatarImage',
    timestamps: false,
  };

  const AvatarImage = sequelize.define(alias, cols, config);

  AvatarImage.associate = (models) => {
    AvatarImage.belongsToMany(models.User, {
      as: 'user',
      through: 'userAvatarImage',
      foreignKey: 'avatarImageId',
      otherKey: 'userId',
      timestamps: false,
    });
  };
};
