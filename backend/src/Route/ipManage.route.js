const {
  getAllIpController,
  getSignleIpController,
  updateSigleIpController,
  entryIpController,
} = require("../Controller/ipManage.controller");
const protectedRoutes = require("../middlewares/protectedRouteMiddleware");

const router = require("express").Router();

router.route("/ip").get(protectedRoutes, getAllIpController).post(protectedRoutes, entryIpController);
router.route("/ip/:id").get(protectedRoutes, getSignleIpController).put(protectedRoutes, updateSigleIpController);

module.exports = router;
