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

// Forward /tasks requests
app.use(
  "/tasks",
  proxy(TASK_SERVICE_URL, {
    proxyErrorHandler: (err, res, next) => {
      console.error("TASK SERVICE ERROR:", err);
      res.status(500).json({ error: "Task Service unavailable" });
    },
  })
);

// Forward /users requests
app.use(
  "/users",
  proxy(USER_SERVICE_URL, {
    proxyErrorHandler: (err, res, next) => {
      console.error("USER SERVICE ERROR:", err);
      res.status(500).json({ error: "User Service unavailable" });
    },
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
