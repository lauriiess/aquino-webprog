const jwt = require("jsonwebtoken");

const requireRole = (...allowedTypes) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is required" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!allowedTypes.includes(decoded.type)) {
        return res
          .status(403)
          .json({
            message: "You do not have permission to access this resource",
          });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = requireRole;