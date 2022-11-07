const createApp = require('./config/createApp');
const middlewaresConfig = require('./config/middlewaresConfig');
const dotenv = require('dotenv');

const apiRouter = require('./routes/apiRouter');

// LOAD .env
dotenv.config();

// CREATE EXPRESS APP
const app = createApp();

//SETUP GLOBAL MIDDLEWARES
middlewaresConfig.config(app);

// MOUNT API ROUTER
app.use('/api/v1', apiRouter);
