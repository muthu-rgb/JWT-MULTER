const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { validateEmail, validateMobile } = require("../functions/validation");
const secret = "fgfhgjasddkmjfhkdjKHGJGSKJGNBSNF";
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/create", async (req, res, next) => {
  try {
    if (!validateEmail(req.body.email)) {
      res.status(400).send({ status: false, message: "Invalid email format!" });
      return;
    }

    if (!validateMobile(req.body.mobile)) {
      res.status(400).send({ status: false, message: "Invalid mobile number format!" });
      return;
    }

    if (req.body.password.length < 8) {
      res.status(400).send({ status: false, message: "Password should be at least 8 characters long!" });
      return;
    }

    const existingUserByEmail = await User.findOne({ email: req.body.email });
    const existingUserByMobile = await User.findOne({
      mobile: req.body.mobile,
    });

    if (existingUserByEmail) {
      res
        .status(400)
        .send({
          status: false,
          message: "User already exists with the same email!",
        });
      return;
    } else if (existingUserByMobile) {
      res
        .status(400)
        .send({
          status: false,
          message: "User already exists with the same mobile!",
        });
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = {
      username: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
      role: req.body.role,
    };

    const data = await User.create(user);
    res.send({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      secret,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getall", async (req, res, next) => {
  await User.find({})
    .then((data) => res.send({ success: true, data }))
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  await User.findOne({ _id: req.params.id })
    .then((data) => res.send({ success: true, data }))
    .catch(next);
});

router.put("/:id", async (req, res, next) => {
  await User.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => res.send({ success: true, data }))
    .catch(next);
});

router.delete("/:id", async (req, res, next) => {
  await User.findByIdAndDelete({ _id: req.params.id })
    .then((data) => res.send({ success: true, data }))
    .catch(next);
});

module.exports = router;
