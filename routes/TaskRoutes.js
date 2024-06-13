const express = require("express");
const auth = require("../middlewares/auth");
const {
  createTask,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");
const taskRouter = express.Router();

taskRouter.get("/", auth, getTask);
taskRouter.post("/", auth, createTask);
taskRouter.delete("/:id", auth, deleteTask);
taskRouter.put("/:id", auth, updateTask);

module.exports = taskRouter;
