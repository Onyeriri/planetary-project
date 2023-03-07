const cluster = require("cluster");
const express = require("express");
const os = require("os");

const numCPUs = os.cpus().length;

function delay(duration) {
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    // some code here...
  }
}

const app = express();

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  app.get("/", (req, res) => {
    res.send(`Performance test!!!...${process.pid}`);
  });

  app.get("/timer", (req, res) => {
    delay(9000);
    res.send(`Ding ding... ${process.pid}`);
  });
  app.listen(3000);
  console.log(`Worker ${process.pid} started`);
}
