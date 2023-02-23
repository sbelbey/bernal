const { Router } = require('express');
const router = Router();

router('/.well-known/pki-validation/1E69159652E6CC5D5A22992FB0276F37.txt', (req, res) => {
  res.send('../../public/1E69159652E6CC5D5A22992FB0276F37.txt');
});

router.get('/', (req, res) => {
  res.send('Hola Mundo');
});

module.exports = router;
