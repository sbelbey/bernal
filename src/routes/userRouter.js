const Router = require('express');
const router = Router();

const multer = require('multer');
const folder = require('../middlewares/imagesUploader');
const upload = multer({ storage: folder('usersAvatars') });

const userRegisterValidations = require('../middlewares/userRegisterValidator');
const userUpdateValidator = require('../middlewares/userUpdateValidator');
const userExtractor = require('../middlewares/userExtractor');
// const authorizationVerificator = require('../middlewares/authorizationVerificator');

const { register, login, update, getAllUsers, getUser } = require('../controllers/api/userController');

router.post('/register', userRegisterValidations, register);
router.post('/login', login);
router.get('/all', userExtractor, getAllUsers);
router.get('/', userExtractor, getUser);
router.put('/', [upload.single('avatar')], userExtractor, userUpdateValidator, update);

module.exports = router;
