const { Router } = require('express');
const router = Router();
const path = require('path');
const fs = require('fs');

router.get('/.well-known/pki-validation/1E69159652E6CC5D5A22992FB0276F37.txt', (req, res) => {
  const filePath = path.join(__dirname, '..', '..', 'public', '1E69159652E6CC5D5A22992FB0276F37.txt');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }
    res.set('Content-Type', 'text/plain');
    res.send(data);
  });
});

router.get('/', (req, res) => {
  res.send('Hola Mundo');
});


module.exports = router;
