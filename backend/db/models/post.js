'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId' })
      Post.hasMany(models.Comment, { foreignKey: 'postId' })
      Post.hasMany(models.Like, { foreignKey: 'postId' })
    }
  }
  Post.init({
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 4096]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post'
  });
  return Post
};