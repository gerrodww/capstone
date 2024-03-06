'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'userId', onDelete: 'cascade', hooks:true })
      User.hasMany(models.Comment, { foreignKey: 'userId', onDelete: 'cascade', hooks:true })
      User.hasMany(models.Like, { foreignKey: 'userId', onDelete: 'cascade', hooks:true })

      User.belongsToMany(models.User, { 
        as: 'followers',
        through: 'Follows', 
        foreignKey: 'followedId',
        hooks: true
      });
      User.belongsToMany(models.User, { 
        as: 'following',
        through: 'Follows', 
        foreignKey: 'followerId',
        hooks: true 
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
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
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt", "bio", "image","darkMode"]
      }
    }
  });
  return User;
};
