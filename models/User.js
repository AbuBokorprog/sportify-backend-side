const userCollection = require("../collections/userCollection");

class User {
  async post(data) {
    const collection = await userCollection();
    const result = await collection.insertOne(data);
    return result;
  }

  async getUser() {
    const collection = await userCollection();
    const result = await collection.find().toArray();
    return result;
  }

  async getByEmail(email) {
    const collection = await userCollection();
    const result = await collection.findOne({email});
    return result;
  }
}

const user = new User();

module.exports = user;
