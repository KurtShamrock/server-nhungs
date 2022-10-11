const express = require("express");
const router = express.Router();
const { Device, validate } = require("../model/device");
const { Users } = require("../model/users");
const auth = require("../middleware/auth");
const validObjectId = require("../middleware/validObjectId");
const Joi = require("joi");

//create device
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const device = await Device({ ...req.body }).save();

  res.status(201).send({ data: device });
});
//get device by id
router.get("/:id", [validObjectId, auth], async (req, res) => {
  const device = await Device.findById(req.params.id);
  if (!device) return res.status(404).send("notfound");

  const data = await Data.find({ _id: device.data });
  res.status(200).send({ data: { device, data } });
});

module.exports = router;
