const { v4 } = require('uuid');
const uuid = v4;
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'product',
      Array(100)
        .fill(0)
        .map(() => {
          return {
            id: uuid(),
            name: faker.commerce.productName(),
            brand: faker.company.name(),
            model: faker.lorem.slug(),
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
            origin: 'Argentina',
            waranty: 12,
            voltage: Number((Math.random() * 99).toFixed(0)),
            capacity: Number((Math.random() * 9999).toFixed(0)),
            height: Number((Math.random() * 9).toFixed(1)),
            width: Number((Math.random() * 9).toFixed(2)),
            length: Number((Math.random() * 9).toFixed(2)),
            stock: Number((Math.random() * 9999).toFixed(0)),
            isActive: true,
            createdAt: new Date(),
            createdBy: 'fb3bff4a-8da9-4925-bbf0-700bd74e4484',
            updatedAt: new Date(),
            updatedBy: 'fb3bff4a-8da9-4925-bbf0-700bd74e4484',
          };
        })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product', null, {});
  },
};
