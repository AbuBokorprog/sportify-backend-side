require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Home, Hello World!");
});

app.listen(port, () => {
  console.log(`Sportify app running port ${port} http://localhost:${port}`);
});
