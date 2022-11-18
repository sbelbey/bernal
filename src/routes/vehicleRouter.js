const Router = require('express');
const router = Router();

const vehicleCreateValidator = require('../middlewares/validators/vehicleCreateValidator');

const userExtractor = require('../middlewares/userExtractor');
const adminVerification = require('../middlewares/adminVerification');

const { vehicleCreate } = require('../controllers/api/vehicleController');

router.post('/', userExtractor, adminVerification, vehicleCreateValidator, vehicleCreate);

module.exports = router;
