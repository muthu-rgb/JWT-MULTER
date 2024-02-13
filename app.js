const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const clientModel = require("./models/clientModel");
const imageModel = require("./models/imageModel");
const userRouter = require("./router/userRouter");
const clientRouter = require("./router/clientRouter");
const multerRouter = require("./router/multerRouter");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/client", clientRouter);
app.use("/multer", multerRouter);

const port = 3500;

mongoose.connect("mongodb://localhost/Jwt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
