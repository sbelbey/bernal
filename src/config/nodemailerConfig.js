const { createTransport } = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const TEST_EMAIL = process.env.EMAIL_SENDER;

const TEST_PASSWORD = process.env.EMAIL_SENDER_PASSWORD;

const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: TEST_EMAIL,
    pass: TEST_PASSWORD,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
