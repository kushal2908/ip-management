const { getAllIpController, getSignleIpController, updateSigleIpController } = require("../Controller/ipManage.controller");
const protectedRoutes = require("../middlewares/protectedRouteMiddleware");

const router = require("express").Router();
// const { signupController, signinController } = require("../Controller/auth.controller");

router.get("/ip", protectedRoutes, getAllIpController);
router.route("/ip/:id").get(protectedRoutes, getSignleIpController).put(protectedRoutes, updateSigleIpController);

module.exports = router;
