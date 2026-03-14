const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ msg: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (roles.length && !roles.includes(decoded.role))
      return res.status(403).json({ msg: "Access denied" });

    req.user = decoded;

    next();
  };
};

module.exports = auth;