const Router = require('express');
const router = Router();
const transporter = require('../config/nodemailerConfig');
const { sns, SNS_TOPIC_ARN } = require('../config/awsConfig');

router.post('/sns', async (req, res) => {
  try {
    console.log('llegó hasta acá');
    const userData = JSON.stringify(req.body.data ?? req.body);
    const mailOptions = {
      Subject: req.body.subject,
      Message: `<p>${userData}</p>`,
      TopicArn: SNS_TOPIC_ARN,
    };

    const response = sns.publish(mailOptions);
    res.status(200).json({ message: 'El mensaje fue enviado.', response });
  } catch (error) {
    res.send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = JSON.stringify(req.body.data ?? req.body);
    const mailOptions = {
      from: 'Pagina web',
      to: 'darrion.adams@ethereal.email',
      subject: req.body.subject,
      html: `<p>${userData}</p>`,
    };

    const response = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'El mensaje fue enviado.', response });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
