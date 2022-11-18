const { Router } = require('express');
const router = Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const vehicleRouter = require('./vehicleRouter');

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/vehicles', vehicleRouter);

module.exports = router;
