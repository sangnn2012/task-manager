const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const id = req.params.id;
    const body = req.body;
    // { new: true } return value of new value of user instead of former one.
    const user = await User.findById(req.params.id);
    updates.forEach(update => user[update] = body[update]);
    await user.save();

    // const user = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  try {
    let users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    let user = await User.findById(_id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
