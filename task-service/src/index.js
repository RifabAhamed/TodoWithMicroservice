import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { authMiddleware } from "../authMiddleware.js"; // import middleware

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Task Schema
const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // link tasks to user
});
const Task = mongoose.model("Task", taskSchema);

// Routes (all protected)
app.get("/tasks", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }); // only user's tasks
  res.json(tasks);
});

app.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user.id });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/tasks/:id", authMiddleware, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(task);
});

app.delete("/tasks/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.sendStatus(204);
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Task DB connected");
    app.listen(4001, () => console.log("Task Service running on port 4001"));
  })
  .catch((err) => console.log("DB Connection Error:", err));
