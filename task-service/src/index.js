import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Sequelize, DataTypes } from "sequelize";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== Middleware: Auth =====
export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // expects "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    req.user = decoded; // { id: ... }
    next();
  });
}

// ===== MongoDB: Task Schema =====
// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   completed: { type: Boolean, default: false },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// });
// const Task = mongoose.model("Task", taskSchema);


// ===== PostgreSQL: Sequelize Setup =====
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
  }
);

// ===== Task Model =====
const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.STRING, // we’ll store JWT user id as string
    allowNull: false,
  },
});



// ===== Routes (all protected) =====

// Get all tasks for logged-in user
app.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new task for logged-in user
app.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user.id });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task (only by owner)
app.put("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task (only by owner)
app.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Connect to PostgreSQL & Start Server =====
sequelize
  .sync() // creates table if not exists
  .then(() => {
    console.log("Postgres connected & models synced");
    app.listen(process.env.PORT || 4001, () =>
      console.log(`Task Service running on port ${process.env.PORT || 4001}`)
    );
  })
  .catch((err) => console.log("DB Connection Error:", err));