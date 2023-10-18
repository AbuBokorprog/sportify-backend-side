require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const routes = require("./routes");

app.use(express.json());

app.use(routes);

app.get("/", (req, res) => {
  res.send("Home, Route is available!");
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.json({message: "Something went wrong on server!"});
});

app.listen(port, () => {
  console.log(`Sportify app running port ${port} http://localhost:${port}`);
});
