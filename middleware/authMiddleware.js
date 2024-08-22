const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).send({ message: "Token not provided" });
  }

  jwt.verify(token, keys.secretOrKey, (err, decoded) => {
    if (err) {
      console.log("Error verfying toke:", err);
      return res
        .status(401)
        .send({ message: "Invalid token", error: err.message });
    }

    console.log("Token decoded:", decoded);
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
