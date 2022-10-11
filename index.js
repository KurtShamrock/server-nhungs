require("dotenv").config();
const usersRoutes = require("./routes/users");
const deviceRoutes = require("./routes/device");
const dataRoutes = require("./routes/data");

const authRoutes = require("./routes/auth");
const connection = require("./db");

const express = require("express");
const cors = require("cors");
const app = express();

//Routes
connection();
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/device", deviceRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
