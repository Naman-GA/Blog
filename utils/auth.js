const jwt = require("jsonwebtoken");
const config = require("./config");

const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Authentication token missing" });
  }

  const token = authorizationHeader.split(" ")[1]; // Split at the space to get the token

  if (!token) {
    return res.status(401).json({ error: "Authentication token missing" });
  }
  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user; // Attach the authenticated user's data to the request
    next();
  });
};

module.exports = auth;
