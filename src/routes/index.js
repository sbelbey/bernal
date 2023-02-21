const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.send('Hola Mundo');
});

module.exports = router;
