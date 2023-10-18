const {ObjectId} = require("mongodb");
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

  async getById(id) {
    const collection = await userCollection();
    const result = await collection.findOne({_id: new ObjectId(id)});
    return result;
  }

  async deleteById(id) {
    const collection = await userCollection();
    const result = await collection.deleteOne({_id: new ObjectId(id)});
    return result;
  }

  async updateById(id, value) {
    const collection = await userCollection();
    const updateDoc = {
      $set: {...value},
    };

    const result = await collection.updateOne(
      {_id: new ObjectId(id)},
      updateDoc
    );
    return result;
  }
}

const user = new User();

module.exports = user;
