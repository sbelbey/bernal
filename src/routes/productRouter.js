const Router = require('express');
const router = Router();

const multer = require('multer');
const folder = require('../middlewares/imagesUploader');
const upload = multer({ storage: folder('products') });

const productCreateValidator = require('../middlewares/validators/productCreate');
const userExtractor = require('../middlewares/userExtractor');
const adminVerification = require('../middlewares/adminVerification');

const { productCreate } = require('../controllers/api/productController');

router.post('/', upload.array('images'), userExtractor, adminVerification, productCreateValidator, productCreate);

module.exports = router;
