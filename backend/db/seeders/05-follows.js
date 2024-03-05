'use strict';

const {User, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Follows';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
      options.tableName = "Follows";
      return queryInterface.bulkInsert(options, [
        {
          followerId: 1,
          followedId: 2
        },
        {
          followerId: 1,
          followedId: 3
        },
        {
          followerId: 1,
          followedId: 4
        },
        {
          followerId: 1,
          followedId: 5
        },
        {
          followerId: 1,
          followedId: 6
        },
        {
          followerId: 2,
          followedId: 1
        },
        {
          followerId: 3,
          followedId: 1
        },
        {
          followerId: 4,
          followedId: 1
        },
        {
          followerId: 5,
          followedId: 1
        },
        {
          followerId: 6,
          followedId: 1
        },
      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Follows";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        followerId: {[Op.in]: []}
      })
    }
  }