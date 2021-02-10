const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id });
    if (!task) {
      return res.status(404).send({ error: "Task not found!" });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid task updates" });
  }
  try {
    const id = req.params.id;
    const body = req.body;

    const task = await Task.findById(id);
    updates.forEach((update) => task[update] = body[update]);
    await task.save();
    // const task = await Task.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!task) {
      return res.status(404).send({ error: "Task not found!" });
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).send({ error: "Task not found!" });
    }
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
