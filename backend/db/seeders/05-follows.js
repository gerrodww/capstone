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
          follower: 1,
          leader: 2
        },
        {
          follower: 1,
          leader: 3
        },
        {
          follower: 1,
          leader: 4
        },
        {
          follower: 1,
          leader: 5
        },
        {
          follower: 1,
          leader: 6
        },
        {
          follower: 2,
          leader: 1
        },
        {
          follower: 3,
          leader: 1
        },
        {
          follower: 4,
          leader: 1
        },
        {
          follower: 5,
          leader: 1
        },
        {
          follower: 6,
          leader: 1
        },
      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Follows";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        follower: {[Op.in]: []}
      })
    }
  }