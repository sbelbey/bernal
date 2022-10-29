const express = require('express');
const app = express();
const dotenv = require('dotenv');

const apiRouter = require('./routes/apiRouter');

// LOAD .env
dotenv.config();

// MOUNT API ROUTER
app.use('/api/v1', apiRouter);

app.use(express.json());

//EXPORTS FOR TESTS
module.exports = app;
