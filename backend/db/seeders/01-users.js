'use strict';

const {User, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Users';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
      options.tableName = "Users";
      return queryInterface.bulkInsert(options, [
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'billy@user.io',
          username: 'Billiam',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'susie@user.io',
          username: 'Soozey',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'marc@user.io',
          username: 'Marc',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'jean@user.io',
          username: 'Jean',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'rin@user.io',
          username: 'Rin',
          hashedPassword: bcrypt.hashSync('password')
        },
      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Users";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        username: {[Op.in]: []}
      })
    }
  }
