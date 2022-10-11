const express = require("express");
const router = express.Router();
const { Users, validate } = require("../model/users");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const validObjectId = require("../middleware/validObjectId");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(403).send({ message: "User has already exist" });
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  let newUser = await new Users({
    ...req.body,
    password: hashPassword,
  }).save();
  newUser.password = undefined;
  newUser._v = undefined;

  res
    .status(200)
    .send({ data: newUser, message: "Account created successfully!" });
});
//get all users data
router.get("/", async (req, res) => {
  const users = await Users.find().select("-password -_v");
  res.status(200).send({ data: users });
});
//update user by id
router.put("/:id", [validObjectId, auth], async (req, res) => {
  const user = await Users.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).select("-password -_v");
  res.status(200).send({ data: user });
});
//get user data by id
router.get("/:id", [validObjectId, auth], async (req, res) => {
  const user = await User.findById(req.params.id).select("-password -_v");
  res.status(200).send({ data: user });
});
module.exports = router;
