const express = require("express");
const cluster = require("cluster");

const app = express();

function delay(duration) {
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    // some code here...
  }
}

app.get("/", (req, res) => {
  res.send(`Performance test!!!...${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`Ding ding... ${process.pid}`);
});

if (cluster.isMaster) {
  console.log("Master server started...");
  cluster.fork();
  cluster.fork();
} else {
  console.log("Started worker server");
  app.listen(3000);
}
