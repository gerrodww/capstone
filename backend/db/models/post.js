'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId', hooks:true })
      Post.hasMany(models.Comment, { foreignKey: 'postId', hooks:true })
      Post.hasMany(models.Like, { foreignKey: 'postId', hooks:true })
    }
  }
  Post.init({
    body: {
      type: DataTypes.STRING(280),
      allowNull: true,
      validate: {
        len: [3, 280]
      }
    },
    imageUrl: {
      type: DataTypes.STRING(256),
      allowNull: true
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