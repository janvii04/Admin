var express = require("express");
var router = express.Router();
const controller = require("../controllers/userController");
// router.get("/login", controller.login);
router.get("/dashboard", controller.signUp);
router.get("/user", controller.user);
router.get("/music", controller.Music);
router.get("/addMusicList",controller.addMusic);
router.post("/createMusic",controller.createMusic);
router.delete("/deleteMusic/:id",controller.deleteMusic);

router.get("/Challenges", controller.Challenges);
router.get("/addChallenge",controller.addChallenge);
router.post("/createChallenges",controller.createChallenges);
router.delete("/deleteChallenges/:id",controller.deleteChallenges);

router.get("/FAQ", controller.FAQ);

router.get("/contactUs", controller.contactUs);
router.get("/Banner", controller.Banner);
router.get("/TermConditions", controller.TermConditions);
router.get("/PrivacyPolicy", controller. PrivacyPolicy);
router.get("/aboutUs", controller. aboutUs);

module.exports = router;
