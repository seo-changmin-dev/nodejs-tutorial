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
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};