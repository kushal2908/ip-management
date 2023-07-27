const router = require("express").Router();
const { signupController, signinController } = require("../Controller/auth.controller");

router.post("/signup", signupController);
router.post("/signin", signinController);

module.exports = router;
