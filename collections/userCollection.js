const {client} = require("../db");

const userCollection = async () => {
  const db = await client.db();
  const collection = db.collection("user");
  return collection;
};

module.exports = userCollection;
