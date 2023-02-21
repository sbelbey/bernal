const createApp = require('./config/createApp');
const middlewaresConfig = require('./config/middlewaresConfig');
const log4jsConfig = require('./config/log4jsConfig');
const dotenv = require('dotenv');

const apiRouter = require('./routes/apiRouter');
const apiRouterIndex = require('./routes/index.js/index');

// LOAD .env
dotenv.config();

// CREATE EXPRESS APP
const app = createApp();

//SETUP GLOBAL MIDDLEWARES
middlewaresConfig.config(app);

//SETUP LOG4JS
log4jsConfig.config();

// MOUNT API ROUTER
app.use('/api/v1', apiRouter);
app.use('/', apiRouterIndex);
