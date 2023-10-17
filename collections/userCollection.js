const connectToDatabase = require("../db");

const userCollection = async () => {
  const db = await connectToDatabase();
  const collection = db.collection("user");
  return collection;
};

module.exports = userCollection;
