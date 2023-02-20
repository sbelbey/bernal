const express = require('express');
const cluster = require('cluster');
const { cpus } = require('os');

module.exports = function createExpressApp() {
  const app = express();
  const modeCluster = process.env.MODE == 'CLUSTER';
  const PORT = process.env.PORT ?? 8080;

  if (modeCluster && cluster.isPrimary) {
    const numCPUS = cpus().length;
    console.log(`CPUs Quantity: ${numCPUS}`);
    console.log(`PID MASTER: ${process.pid}`);
    for (let i = 0; i < numCPUS; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString());
      cluster.fork();
    });
  } else {
    
    app.listen(PORT, (err) => {
      if (err) console.log(`Servidor de express escuchando puerto ${PORT} - PID WORKER ${process.pid}`);
    });
  }

  return app;
};
