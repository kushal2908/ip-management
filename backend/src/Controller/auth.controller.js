const jwt = require("jsonwebtoken");
const { logger } = require("../utils/logger");
const { hash, compare } = require("../utils/password");
const Users = require("../model/users.model");
const AuditLogs = require("../model/auditLogs.model");

///////////////////////////////////////////////////////////////////////////
//@DESC        Register a user
//@ROUTE       POST api/auth/signup
//@ACESS       Public
///////////////////////////////////////////////////////////////////////////
const signupController = async (req, res) => {
  const { name, password } = req.body;
  //Hashing the password
  const hashedPass = hash(password);

  //Checking if any input is empty or not
  if (!name || !password) {
    res.status(400).json({
      msg: "Please add all fields",
    });
  }

  //   Checking if user already exist or not
  const userExist = await Users.findOne({ where: { name: name } });
  if (userExist) {
    res.status(400).json({
      msg: "User already exist",
    });
  } else {
    const createUser = await Users.create({ name: name, password: hashedPass });
    if (createUser) {
      res.status(201).json({
        msg: "User Created Successfully",
      });
      // Audit log
      const logMsg = `USER CREATED: ${name} has been created from ${req.connection.remoteAddress.split(":")[3]}`;
      logger.info(logMsg);
      // INSERT into db
      await AuditLogs.create({
        log: logMsg,
      });
    } else {
      res.status(400).json({
        msg: "Invalid user data",
      });
    }
  }
};

///////////////////////////////////////////////////////////////////////////
//@DESC        Signin a user
//@ROUTE       POST api/auth/signin
//@ACESS       Public
///////////////////////////////////////////////////////////////////////////
const signinController = async (req, res) => {
  const { name, password } = req.body;

  // Check  for user
  const user = await Users.findOne({ where: { name: name } });

  if (user && (await compare(password, user.password))) {
    const userDataForJWT = { userId: user?.id, name: user?.name };
    res.status(200).json({
      success: true,
      statuscode: 200,
      msg: "User signedin successfuly",
      token: createJWT(userDataForJWT),
    });

    // Audit log
    const logMsg = `USER SIGNIN: ${user?.name} signed in successfuly from ${req.connection.remoteAddress.split(":")[3]} `;
    logger.info(logMsg);
    // INSERT into DB
    await AuditLogs.create({
      log: logMsg,
    });
  } else {
    res.status(400).json({
      success: false,
      statuscode: 400,
      msg: "Invalid credential",
    });
    logger.error(`USER: ${name} failed to singed in from ${req.connection.remoteAddress.split(":")[3]}`);
  }
};

// Generate jwt
const createJWT = (data) => {
  return jwt.sign(
    {
      data: data,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30days" }
  );
};
module.exports = { signupController, signinController };
