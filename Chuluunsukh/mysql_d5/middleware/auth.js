const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      data: "USer token should be provided",
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
  return next();
};

module.exports = verifyToken;
