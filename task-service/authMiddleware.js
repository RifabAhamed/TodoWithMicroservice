import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Check if Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Expect header format: "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = decoded; // attach decoded payload to request
    next();
  });
}
