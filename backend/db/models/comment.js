'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId', hooks:true })
      Comment.belongsTo(models.Post, { foreignKey: 'postId', hooks:true })
    }
  }
  Comment.init({
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
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment'
  });
  return Comment;
};