require("dotenv").config();

const {MongoClient} = require("mongodb");
const dbName = "sportify";

// If you want to use the remote MongoDB URI, use `uri` here
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p7e2eey.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the remote database");
    return client;
  } catch (error) {
    console.error("Error connecting to the remote database:", error);
    throw error;
  }
}

module.exports = {connectToDatabase, client};
