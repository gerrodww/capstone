'use strict';

const {User, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Comments';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
      options.tableName = "Comments";
      return queryInterface.bulkInsert(options, [
        {
          body: "Hail Reaper!",
          userId: 1,
          postId: 14
        },
        {
          body: "no",
          userId: 1,
          postId: 17
        },
        {
          body: "and this is the third seed comment",
          userId: 1,
          postId: 3
        },
        {
          body: "生きることと生きていくことは違う",
          userId: 6,
          postId: 1
        },
        {
          body: "Suspendisse potenti. Sed auctor quam in arcu efficitur",
          userId: 6,
          postId: 1
        },
        {
          body: "Woah thats totally remarkable",
          userId: 6,
          postId: 1 
        },
        {
          body: "Heres a comment for your efforts!",
          userId: 2,
          postId: 7
        },
        {
          body: "Pellentesque ullamcorper nunc sed nisl dictum fringilla. ",
          userId: 4,
          postId: 5 
        },
        {
          body: "Another comment!",
          userId: 2,
          postId: 1 
        },
        {
          body: "This is MY post",
          userId: 1,
          postId: 1
        },
        {
          body: "Dude you can share the internet",
          userId: 4,
          postId: 1
        },
        {
          body: "Are we really arguing in seed data guys?",
          userId: 6,
          postId: 1 
        },
        {
          body: "Maecenas euismod ex nec ligula sodales, sit amet congue lectus bibendum.",
          userId: 3,
          postId: 12 
        },
        {
          body: "Vivre et laisser vivre, c'est la règle d'or. Quand je regarde les étoiles dans le ciel, je me sens libre comme un oiseau. Vivamus et amamus, c'est la clé du bonheur. La joie de vivre est contagieuse, alors partageons-la avec le monde.",
          userId: 5,
          postId: 12 
        },
        {
          body: "beep boop beep boop beep",
          userId: 6,
          postId: 18 
        },

      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Comments";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        userId: {[Op.in]: []}
      })
    }
  }