'use strict';
module.exports = (sequelize, DataTypes) => {
  const Responses = sequelize.define('Responses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    messageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Responses.associate = function(models) {
    // associations can be defined here
    Responses.belongsTo(models.Messages)
  };
  return Responses;
};