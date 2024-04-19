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
          image: 'https://capstone-gerrodww.s3.us-east-2.amazonaws.com/1713486829478.gif',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'billy@user.io',
          username: 'Billiam',
          image: 'https://capstone-gerrodww.s3.us-east-2.amazonaws.com/mancopy.png',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'susie@user.io',
          username: 'Susan',
          image: 'https://capstone-gerrodww.s3.us-east-2.amazonaws.com/soozie.png',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'marc@user.io',
          username: 'Marc',
          image: 'https://capstone-gerrodww.s3.us-east-2.amazonaws.com/marc.png',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'jean@user.io',
          username: 'Jean',
          image: 'https://capstone-gerrodww.s3.us-east-2.amazonaws.com/jean.png',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'rin@user.io',
          username: 'Rin',
          image: 'https://capstone-gerrodww.s3.us-east-2.amazonaws.com/The_Poppy_War_Rin.webp',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'spongebob@user.io',
          username: '$pongeBob$',
          image: 'https://capstone-gerrodww.s3.us-east-2.amazonaws.com/gsb.jpg',
          hashedPassword: bcrypt.hashSync('password')
        }
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
