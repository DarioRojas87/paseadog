const express = require("express");
const router = express.Router();
const walkersControllers = require("../controllers/walkersControllers");
const userControllers = require("../controllers/userControllers");

router.route("/").get(walkersControllers.home);

router.route("/walkers").get(walkersControllers.walkers);

router.route("/walkers/sign").get(walkersControllers.newWalker);
// .post(walkersControllers.addWalker);

router.route("/walkers/signup").post(userControllers.addWalker);

router.route("/walkers/signin").post(userControllers.logWalker);

router.route("/walkers/signout").get(userControllers.signOutWalker);

router.route("/walkers/:walkerId").get(walkersControllers.walkerProfile);

router.route("/deletewalker/:walkerId").get(userControllers.deleteWalker);

router.route("/update/:walkerId").get(userControllers.updateWalker);

module.exports = router;
