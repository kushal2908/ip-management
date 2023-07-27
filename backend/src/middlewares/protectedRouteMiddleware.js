////////////////////////////////////////////
// This middleware does the work
// when a route needs token to access
///////////////////////////////////////////

const jwt = require("jsonwebtoken");
const Users = require("../model/users.model");
const { logger } = require("../utils/logger");

const protectedRoutes = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from the header and split the space between Bearer and token
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await Users.findByPk(decode?.data?.userId);
      next();
    } catch (err) {
      res.status(401).json({
        msg: "Unauthorized",
      });
      logger.error("Unauthorized");
    }
  } else {
    res.status(403).json({
      msg: "Forbidden",
    });
  }
};

module.exports = protectedRoutes;
