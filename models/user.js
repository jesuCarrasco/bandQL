'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    youtube: DataTypes.STRING,
    bandcamp: DataTypes.STRING,
    location: DataTypes.GEOMETRY('POINT'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    locale: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Messages)
  };
  return User;
};