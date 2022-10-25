const dotenv = require('dotenv');
const createApp = require('./config/create-app');

// LOAD .env
dotenv.config();

// CREATE EXPRESS APP
const app = createApp();

app.post('/api/1.0/users', (req, res) => {
  return res.status(200).send({ message: 'User created' });
});

module.exports = app;
