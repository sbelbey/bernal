const Router = require('express');
const router = Router();

const multer = require('multer');
const folder = require('../middlewares/imagesUploader');
const upload = multer({ storage: folder('usersAvatars') });

const userRegisterValidations = require('../middlewares/validators/userRegister');
const userUpdateValidations = require('../middlewares/validators/userUpdate');
const userExtractor = require('../middlewares/userExtractor');

const { register, login, update, getAllUsers, getUser } = require('../controllers/api/userController');

router.post('/register', userRegisterValidations, register);
router.post('/login', login);
router.get('/all', userExtractor, getAllUsers);
router.get('/', userExtractor, getUser);
router.put('/', [upload.single('avatar')], userExtractor, userUpdateValidations, update);

module.exports = router;
