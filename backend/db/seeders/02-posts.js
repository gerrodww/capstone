'use strict';

const {User, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Posts';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
      options.tableName = "Posts";
      return queryInterface.bulkInsert(options, [
        {
          body: 'This is the first seed post!',
          userId: 1
        },
        {
          body: 'This is the second seed post!',
          userId: 1
        },
        {
          body: 'This is the third seed post!',
          userId: 1
        },
        {
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat ultrices ligula, vitae faucibus dolor ullamcorper eget.',
          userId: 2
        },
        {
          body: 'Nullam dapibus, dolor at aliquam accumsan, nisi mi pellentesque quam, eget commodo est libero in eros.',
          userId: 2
        },
        {
          body: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin nec nunc nec tortor venenatis varius.',
          userId: 2
        },
        {
          body: 'Sed sit amet justo vel libero malesuada pretium. Phasellus ultrices, turpis quis fermentum pulvinar, nisl leo ultricies nisi, et feugiat libero metus vitae ante. Vivamus eget feugiat nisl.',
          userId: 3
        },
        {
          body: 'Suspendisse potenti. Sed auctor quam in arcu efficitur, nec dictum elit tincidunt. Nullam at eros vitae justo malesuada commodo. Duis tincidunt, ligula sit amet mattis interdum, justo justo scelerisque sem, vel faucibus magna dolor in velit.',
          userId: 3
        },
        {
          body: 'Ut consectetur tortor eget sem venenatis, non mattis lorem dapibus. Sed dignissim, magna eu interdum eleifend, justo dolor fermentum lorem, in bibendum dolor ex nec nunc. Integer vel dui ullamcorper, sodales mi non, tristique purus.',
          userId: 3
        },
        {
          body: 'Pellentesque ullamcorper nunc sed nisl dictum fringilla.',
          userId: 4
        },
        {
          body: 'Nam nec ligula sit amet enim rutrum suscipit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam id est dui. In consequat nisl a lorem gravida dapibus.',
          userId: 4
        },
        {
          body: 'Nam id quam a odio sollicitudin eleifend. Aliquam semper libero non efficitur vehicula.',
          userId: 4
        },
        {
          body: 'Maecenas euismod ex nec ligula sodales, sit amet congue lectus bibendum. Sed feugiat odio sed libero placerat, in bibendum nisi consectetur. Sed dignissim ligula sed nunc auctor, vel finibus lectus ultrices.',
          userId: 5
        },
        {
          body: 'Wow, I cant belive this website is so awesome!',
          userId: 5
        },
        {
          body: 'We brush away light resistance and the downed Storm God',
          userId: 5
        },
        {
          body: 'This lorem is ispum!',
          userId: 6
        },
        {
          body: 'Parles-tu francais?',
          userId: 6
        },
        {
          body: 'Portez-vous des perruques?',
          userId: 6
        },
        
      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Posts";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        userId: {[Op.in]: []}
      })
    }
  }