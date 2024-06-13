const taskModel = require("../models/task");
const createTask = async (req, res) => {
  // console.log(req.userId);
  const { title, description, important, status } = req.body;
  const newTask = await new taskModel({
    title: title,
    description: description,
    important: important,
    status,
    userId: req.userId,
  });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const task = await taskModel.findByIdAndDelete(id);
    res.status(202).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const getTask = async (req, res) => {
  try {
    const savedTask = await taskModel.find({ userId: req.userId });
    res.status(200).json(savedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description, important, status } = req.body;
  
    try {
      const updatedTask = await taskModel.findByIdAndUpdate(taskId, {
        title,
        description,
        important,
        status,
      }, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

module.exports = { createTask, deleteTask, getTask, updateTask };
