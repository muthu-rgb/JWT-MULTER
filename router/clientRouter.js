const router = require("express").Router();
const Client = require("../models/clientModel");
const checkAdminRole = require("../middleware/adminPermission");

router.post("/create", checkAdminRole, async (req, res, next) => {
  await Client.create(req.body)
    .then((data) => res.send({ success: true, data }))
    .catch(next);
});

router.get("/getall", checkAdminRole, async (req, res, next) => {
  await Client.find({})
    .then((data) => res.send({ success: true, data }))
    .catch(next);
});

router.get("/:id", checkAdminRole, async (req, res, next) => {
  await Client.findOne({ _id: req.params.id })
    .then((data) => res.send({ success: true, data }))
    .catch(next);
});

router.put("/:id", checkAdminRole, async (req, res, next) => {
  await Client.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => res.send({ success: true, data }))
    .catch(next);
});

router.delete("/:id", checkAdminRole, async (req, res, next) => {
  await Client.findByIdAndDelete({ _id: req.params.id })
    .then((data) => res.send({ success: true, data }))
    .catch(next);
});

module.exports = router;
