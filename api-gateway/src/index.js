import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const TASK_SERVICE_URL =
  process.env.TASK_SERVICE_URL || "http://localhost:4001";
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:4002";

/**
 * TASK SERVICE ROUTES
 * /tasks -> forwarded to Task Service
 */
app.use(
  "/tasks",
  proxy(TASK_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/tasks${req.url}`, // keeps /tasks path
    proxyErrorHandler: (err, res, next) => {
      console.error("TASK SERVICE ERROR:", err);
      res.status(500).json({ error: "Task Service unavailable" });
    },
  })
);

/**
 * USER SERVICE ROUTES
 * /signup, /login, /users -> forwarded to User Service
 */
app.use(
  ["/signup", "/login", "/users"],
  proxy(USER_SERVICE_URL, {
    proxyReqPathResolver: (req) => req.originalUrl, // keeps exact path
    proxyErrorHandler: (err, res, next) => {
      console.error("USER SERVICE ERROR:", err);
      res.status(500).json({ error: "User Service unavailable" });
    },
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ API Gateway running on http://localhost:${PORT}`)
);
