const { Router } = require('express');
const router = Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const vehicleRouter = require('./vehicleRouter');
const categoriesRouter = require('./categoryRouter');
const checkoutRouter = require('./checkoutRouter');
const emailSender = require('./emailSender.js');

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/vehicles', vehicleRouter);
router.use('/categories', categoriesRouter);
router.use('/checkout', checkoutRouter);
router.use('/sendEmail', emailSender);
router.use('/', (req, res) => {
  res.send('Hola Mundo');
});

module.exports = router;
