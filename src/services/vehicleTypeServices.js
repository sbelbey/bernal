const { VehicleType } = require('../database/models');

module.exports = {
  addType: async (vehicleId, type) => {
    try {
      const typeCreated = await VehicleType.create(
        {
          type: type,
        }
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
