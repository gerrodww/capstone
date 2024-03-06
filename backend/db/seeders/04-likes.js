'use strict';

const {User, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Likes';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
      options.tableName = "Likes";
      return queryInterface.bulkInsert(options, [
        {
          userId: 1,
          postId: 4
        },
        {
          userId: 1,
          postId: 5
        },
        {
          userId: 1,
          postId: 6
        },
        {
          userId: 2,
          postId: 1
        },
        {
          userId: 2,
          postId: 2
        },
        {
          userId: 2,
          postId: 3
        },
        {
          userId: 3,
          postId: 1
        },
        {
          userId: 3,
          postId: 2
        },
        {
          userId: 3,
          postId: 3
        },
        {
          userId: 4,
          postId: 1
        },
        {
          userId: 4,
          postId: 2
        },
        {
          userId: 4,
          postId: 3
        },
        {
          userId: 5,
          postId: 1
        },
        {
          userId: 5,
          postId: 2
        },
        {
          userId: 5,
          postId: 3
        },
        {
          userId: 6,
          postId: 1
        },
        {
          userId: 6,
          postId: 2
        },
        {
          userId: 6,
          postId: 3
        },
        {
          userId: 2,
          postId: 10
        },
      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Likes";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        userId: {[Op.in]: []}
      })
    }
  }