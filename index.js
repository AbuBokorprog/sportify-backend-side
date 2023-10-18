require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const routes = require("./routes");
const {connectToDatabase} = require("./db");

app.use(express.json());

app.use(routes);

app.get("/", (req, res) => {
  res.send("Home, Route is available!");
});

app.use((err, req, res, next) => {
  console.log(err);

  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.statue ? err.status : 500;

  return res.status(status).json({message});
});

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Sportify app running port ${port} http://localhost:${port}`);
});
