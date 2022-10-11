const mongoose = require("mongoose");

module.exports = async () => {
  const connectParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(process.env.DB, connectParams);
    console.log("connected!");
  } catch (error) {
    console.log("error" + error);
  }
};
