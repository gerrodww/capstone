'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {
    }
  }
  Follow.init({
    follower: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    leader: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Follow'
  });
  return Follow
};