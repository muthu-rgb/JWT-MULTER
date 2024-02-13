const { jwtDecode } = require("jwt-decode");

const checkRole = (req, res, next) => {
  const token = req.headers["authorization"];
  const decoded = jwtDecode(token);
  if (decoded.role === "admin") {
    next();
  } else if (decoded.role !== "admin") {
    return res.status(403).json({ error: "Forbidden - User is not an admin" });
  }
};

module.exports = checkRole;
