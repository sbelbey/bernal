const { VehicleType } = require('../database/models');
const { Op } = require('Sequelize');

module.exports = {
  addType: async (vehicleId, type) => {
    try {
      const typeCreated = await VehicleType.create(
        {
          type: type,
        }
        // { include: 'vehicle' }
      );
      return typeCreated;
    } catch (error) {
      console.log(error);
    }
  },
  findVhicleType: async (vehicleId) => {
    const vehicleType = await VehicleType.findOne({ where: { vehicleId: vehicleId } });
    return vehicleType;
  },
};
