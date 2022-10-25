const express = require('express');

module.exports = function createExpressApp() {
  const app = express();

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });

  return app;
};
