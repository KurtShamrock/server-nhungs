const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");
const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  devices: [{ type: ObjectId, ref: "device" }],
});
const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, device: this.device, isAdmin: this.isAdmin },
    process.env.JWTPRIVATEKEY
  );
  return token;
};
const Users = mongoose.model("users", userSchema);
module.exports = { Users, validate };
