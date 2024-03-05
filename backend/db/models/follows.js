'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follows extends Model {
    static associate(models) {
    }
  }
  Follows.init({
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followedId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Follows'
  });
  return Follows
};