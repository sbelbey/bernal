const Router = require('express');
const router = Router();

const vehicleCreateValidator = require('../middlewares/validators/vehicleCreateValidator');
const vehicleUpdateValidator = require('../middlewares/validators/vehicleUpdateValidator');

const userExtractor = require('../middlewares/userExtractor');
const adminVerification = require('../middlewares/adminVerification');
const isAdmin = require('../middlewares/isAdmin');

const {
  vehicleCreate,
  getVehicle,
  modifyVehicle,
  trahsVehicle,
  getAllVehicles,
  getAllBrands,
  getProductByBrand
} = require('../controllers/api/vehicleController');

router.post('/', userExtractor, adminVerification, vehicleCreateValidator, vehicleCreate);
router.get('/', isAdmin, getAllVehicles);
router.get('/brands', getAllBrands);
router.get('/productByBrand', getProductByBrand);
router.get('/:id', isAdmin, getVehicle);
router.put('/:id', userExtractor, adminVerification, vehicleUpdateValidator, modifyVehicle);
router.delete('/:id', userExtractor, adminVerification, vehicleUpdateValidator, trahsVehicle);

module.exports = router;
