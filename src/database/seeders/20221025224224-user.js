'use strict';
const uuid = require('uuid');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        id: uuid.v4(),
        name: faker.name.firstName(),
        midleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(this.name, this.lastName),
        hasPassword: await bcrypt.hash('user1234', 12),
        isAdmin: false,
        isActive: true,
      },
      {
        id: uuid.v4(),
        name: faker.name.firstName(),
        midleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(this.name, this.lastName),
        hasPassword: await bcrypt.hash('user1234', 12),
        isAdmin: true,
        isActive: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
