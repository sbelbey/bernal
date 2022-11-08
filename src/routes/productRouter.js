const Router = require('express');
const router = Router();

const multer = require('multer');
const folder = require('../middlewares/imagesUploader');
const upload = multer({ storage: folder('products') });

const productCreateValidator = require('../middlewares/validators/productCreate')
const userExtractor = require('../middlewares/userExtractor');

const { productCreate } = require('../controllers/api/productController');

router.post('/', upload.array('images'), userExtractor, productCreateValidator, productCreate);

module.exports = router;
