const { VehicleType } = require('../database/models');
const { Op } = require('Sequelize');

module.exports = {
  addType: async (vehicleId, type) => {
    try {
      const typeCreated = await VehicleType.create(
        {
          type: type,
        },
        // { include: 'vehicle' }
      );
      return typeCreated;
    } catch (error) {
      console.log(error);
    }
  },
};
