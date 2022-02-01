'use strict';
const { Model } = require('sequelize');

// name of Model: Singular
// name of Tables on DB: Plural
module.exports = (sequelize, DataTypes) => {
  class User extends Model {};

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    clock: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize, // sequelize object noticed its related Models.
    modelName: 'User',

    timestamps: true,
    createdAt: false,
    updatedAt: 'newUpdatedAt',
  });

  return User;
};