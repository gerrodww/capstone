'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    bio: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    darkMode: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Profile'
  });
  return Profile
};