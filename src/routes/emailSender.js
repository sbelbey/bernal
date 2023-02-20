const Router = require('express');
const router = Router();
const transporter = require('../config/nodemailerConfig');

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
