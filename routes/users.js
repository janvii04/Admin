var express = require("express");
var router = express.Router();
const controller = require("../controllers/userController");
router.get("/", controller.logIn);
router.get("/dashboard", controller.signUp);
router.get("/user", controller.user);
router.get("/addUsers",controller.addUsers);
router.post("/createUsers",controller.createUsers);
router.delete("/deleteUsers/:id",controller.deleteUsers);

router.get("/music", controller.Music);
router.get("/addMusic",controller.addMusic);
router.post("/createMusic",controller.createMusic);
router.delete("/deleteMusic/:id",controller.deleteMusic);

router.get("/Challenges", controller.Challenges);
router.get("/addChallenge",controller.addChallenge);
router.post("/createChallenges",controller.createChallenges);
router.delete("/deleteChallenges/:id",controller.deleteChallenges);

router.get("/FAQ", controller.FAQ);

router.get("/contactUs", controller.contactUs);

router.get("/Banner", controller.Banner);
router.get("/addBanner",controller.addBanner);
router.post("/createBanners",controller.createBanners);
router.delete("/deleteBanners/:id",controller.deleteBanners);


router.get("/TermConditions", controller.TermConditions);
router.get("/PrivacyPolicy", controller. PrivacyPolicy);
router.get("/aboutUs", controller. aboutUs);

module.exports = router;
