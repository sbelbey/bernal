const Router = require('express');
const router = Router();
const { register } = require('../controllers/api/userController');

router.post('/register', register);
// router.post('/signup', singup);
// router.get('/', allUsers);

module.exports = router;
