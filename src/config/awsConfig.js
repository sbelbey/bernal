const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

// AWS configuration

AWS.config.update({
  region: 'sa-east-1',
});

//SNS Config
const sns = new AWS.SNS();
const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN;

module.exports = { sns, SNS_TOPIC_ARN };
