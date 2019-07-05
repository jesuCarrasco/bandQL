'use strict';
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    instrument: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    state: DataTypes.INTEGER,
    city: DataTypes.INTEGER,
    location: DataTypes.GEOMETRY('POINT'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Messages.associate = function(models) {
    // associations can be defined here
    Messages.hasMany(models.Responses)
    Messages.belongsTo(models.User)
  };
  return Messages;
};