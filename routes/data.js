const express = require("express");
const router = express.Router();
const { Device } = require("../model/device");
const { Data } = require("../model/data");
const auth = require("../middleware/auth");
const validObjectId = require("../middleware/validObjectId");
const Joi = require("joi");
//get data by ID
router.get("/:id", async (req, res) => {
  const data = await Data.find({
    device: { $eq: req.params.id },
  });
  res.status(200).send({ data: data });
});
//upload data to device
router.post("/upload-data", async (req, res) => {
  //   const schema = Joi.object({
  //     device: Joi.string().required(),
  //   });
  //   const { error } = schema.validate(req.body);
  //   if (error) return res.status(400).send({ message: error.details[0].message });

  //   const device = await Device.findById(req.body.deviceId);

  //   await device.data.push(...req.body);

  //   await device.save();
  const data = await Data({ ...req.body }).save();
  res.status(200).send({ data: data, message: "ok!" });
});
module.exports = router;
