const mongoose = require("mongoose");
const Joi = require("joi");
const data = require("./data");

const ObjectId = mongoose.Schema.Types.ObjectId;

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const validate = (device) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(device);
};
const Device = mongoose.model("device", deviceSchema);
module.exports = { Device, validate };
