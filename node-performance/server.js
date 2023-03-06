const express = require("express");

const app = express();

function delay(duration) {
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    // some code here...
  }
}

app.get("/", (req, res) => {
  res.send("Performance test!!!");
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send("Ding ding...");
});

app.listen(9000);
