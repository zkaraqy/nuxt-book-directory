'use strict';

/** @type {import('sequelize-cli').Migration} */

const { genSaltSync, hashSync } = require("bcrypt");
const hashPassword = (password) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashPassword('12345678'), 
        created_at: new Date(),
        updated_at: new Date(),
        username: 'Admin',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
