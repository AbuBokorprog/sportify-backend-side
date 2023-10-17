require("dotenv").config();

const {MongoClient} = require("mongodb");

// If you want to use the remote MongoDB URI, use `uri` here
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p7e2eey.mongodb.net/?retryWrites=true&w=majority`;

const dbName = "sportify";

const client = new MongoClient(uri, {useUnifiedTopology: true});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the remote database");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to the remote database:", error);
    throw error;
  }
}

module.exports = connectToDatabase;
