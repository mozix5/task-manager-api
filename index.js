const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/UserRoutes");
const taskRouter = require("./routes/TaskRoutes");

const app = express();

// Load environment variables
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.json());

// Basic route
app.use("/user",userRouter)
app.use("/task",taskRouter)
app.get("/", (req, res) => res.send("hello"));

// Retrieve port from environment or use default
const PORT = process.env.PORT || 5000;

// Function to connect to MongoDB and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

// Start the server
startServer();
