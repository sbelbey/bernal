const dotenv = require('dotenv');

dotenv.config();

const envConfig = {
  NODE_ENV: process.env.NODE_ENV || 'dev',
};

module.exports = envConfig;
