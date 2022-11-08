const { Router } = require('express');
const router = Router();

const userRouter = require('./userRouter');

router.use('/users', userRouter);
router.use('/products', userRouter);

module.exports = router;
