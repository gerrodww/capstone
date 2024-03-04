'use strict';

let options = {};
options.tableName = 'Posts';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(options, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      body: {

      },
      userId: {

      }
    }, options);  
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable(options);
  }
};