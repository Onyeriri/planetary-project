const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://Nasa-data:gLPg3PrWWbwr5Kuv@cluster0.joozu.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!!!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
  });
}

startServer();
