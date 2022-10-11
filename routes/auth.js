const router = require("express").Router();
const { Users } = require("../model/users");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const user = await Users.findOne({
    email: req.body.email,
  });
  if (!user)
    return res.status(400).send({
      message: "Invalid email or password",
    });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({
      message: "Invalid email or password",
    });
  const token = user.generateAuthToken();
  res.status(200).send({ data: token, message: "Signing in few moment..." });
});
module.exports = router;
