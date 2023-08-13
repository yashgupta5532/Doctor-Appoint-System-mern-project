const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("monogdb connected successfully");
  } catch (error) {
    console.log("Error while connecting mongodb " + error);
  }
};

module.exports = connectDB;
