import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variables if set
const TASK_SERVICE_URL =
  process.env.TASK_SERVICE_URL || "http://localhost:4001";
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:4002";

// Forward /tasks requests to Task Service
app.use("/tasks", (req, res, next) => {
  proxy(TASK_SERVICE_URL)(req, res, next);
});

// Forward /users requests to User Service
app.use("/users", (req, res, next) => {
  proxy(USER_SERVICE_URL)(req, res, next);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
