const {client} = require("../db");

const courseCollection = async () => {
  const db = await client.db();
  const collection = db.collection("course");
  return collection;
};

module.exports = courseCollection;
