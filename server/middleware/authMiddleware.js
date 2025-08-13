import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not logged in. No token provided." });
  }

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err && err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    } else if (err) {
      return res.status(403).json({ message: "Invalid token. Access denied." });
    }
    req.user = user;
    next();
  });
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
  console.log("Allowed roles:", allowedRoles);
  console.log("User role:", req.user.role);
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions." });
    }
    next();
  };
};
