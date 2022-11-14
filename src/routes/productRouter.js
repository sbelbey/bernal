const Router = require('express');
const router = Router();

const multer = require('multer');
const folder = require('../middlewares/imagesUploader');
const upload = multer({ storage: folder('products') });

const productCreateValidator = require('../middlewares/validators/productCreate');
const productUpdateValidator = require('../middlewares/validators/productUpdate');
const userExtractor = require('../middlewares/userExtractor');
const adminVerification = require('../middlewares/adminVerification');

const { productCreate, updateProduct } = require('../controllers/api/productController');

router.post('/', userExtractor, adminVerification, upload.array('images'), productCreateValidator, productCreate);
router.put('/:id', userExtractor, adminVerification, upload.array('images'), productUpdateValidator, updateProduct);

module.exports = router;
