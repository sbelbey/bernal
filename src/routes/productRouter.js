const Router = require('express');
const router = Router();

const multer = require('multer');
const folder = require('../middlewares/imagesUploader');
const upload = multer({ storage: folder('products') });

const productCreateValidator = require('../middlewares/validators/productCreate');
const productUpdateValidator = require('../middlewares/validators/productUpdate');
const userExtractor = require('../middlewares/userExtractor');
const adminVerification = require('../middlewares/adminVerification');

const {
  productCreate,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
} = require('../controllers/api/productController');

router.put('/:id', userExtractor, adminVerification, upload.array('images'), productUpdateValidator, updateProduct);
router.delete('/:id', userExtractor, adminVerification, deleteProduct);
router.get('/:id', getProduct);
router.get('/', getAllProduct);
router.post('/', userExtractor, adminVerification, upload.array('images'), productCreateValidator, productCreate);

module.exports = router;
