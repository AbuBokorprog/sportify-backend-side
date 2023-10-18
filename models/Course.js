const {ObjectId} = require("mongodb");
const courseCollection = require("../collections/courseCollection");

class Course {
  async get() {
    const collection = await courseCollection();
    const result = await collection.find().toArray();
    return result;
  }

  async getByInstructorId(id) {
    const collection = await courseCollection();
    const result = await collection.find({instructorId: id}).toArray();
    return result;
  }

  async getById(id) {
    const collection = await courseCollection();
    const result = await collection.findOne({_id: new ObjectId(id)});
    return result;
  }

  async post(data) {
    const collection = await courseCollection();
    const result = await collection.insertOne(data);
    return result;
  }

  async deleteById(id) {
    const collection = await courseCollection();
    const result = await collection.deleteOne({_id: new ObjectId(id)});
    return result;
  }

  async updateById(id, value) {
    const collection = await courseCollection();
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

const course = new Course();
module.exports = course;
