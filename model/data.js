const mongoose = require("mongoose");
const joi = require("joi");
const ObjectId = mongoose.Schema.Types.ObjectId;
const dataSchema = new mongoose.Schema(
  {
    device: { type: ObjectId, ref: "device" },
    data1: { type: Number, default: -1 },
    data2: { type: Number, default: -1 },
    status1: { type: Boolean, default: false },
    status2: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Data = mongoose.model("data", dataSchema);
module.exports = { Data };
