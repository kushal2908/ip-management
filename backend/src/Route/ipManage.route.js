const { getAllIpController, getSignleIpController, updateSigleIpController } = require("../Controller/ipManage.controller");

const router = require("express").Router();
// const { signupController, signinController } = require("../Controller/auth.controller");

router.get("/ip", getAllIpController);
router.route("/ip/:id").get(getSignleIpController).put(updateSigleIpController);

module.exports = router;
