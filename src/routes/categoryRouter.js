const Router = require('express');
const router = Router();
const { getAllCategories } = require('../controllers/api/categoryController');

router.get('/', getAllCategories);

module.exports = router;
