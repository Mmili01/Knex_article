const express = require("express");
const db = require("../db/db.js");

const router = express.Router();

router.get("/todo", async (req, res) => {
  try {
    const tasks = await db.select("*").from("todo");
    res.send({ msg: tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await db("todo").where({ id });
    if (task.length !== 0) {
      res.send({ msg: task });
    } else {
      res.status(400).json({ msg: "task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/todo", async (req, res) => {
  const { title, content } = req.body;
  try {
    const task = await db("todo").insert({ title, content });
    res.status(201).send(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const task = await db("todo")
      .where({ id })
      .update({ title, content }, ["id", "title", "content"]);
    if (task.length !== 0) {
      res.status(201).send(task);
    } else {
      res.status(404).json({ error: "task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await db("todo").where({ id }).del();
    if (task) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
