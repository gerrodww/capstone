'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Following extends Model {
    static associate(models) {
      Following.belongsTo(models.User, { foreignKey: 'followerId '})
      Following.belongsTo(models.Post, { foreignKey: 'followedId '})
    }
  }
  Following.init({
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
    modelName: 'Following'
  });
  return Following
};