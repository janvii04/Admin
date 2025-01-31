var express = require("express");
var router = express.Router();
const controller = require("../controllers/userController");
router.get("/", controller.logIn);
router.get("/dashboard", controller.signUp);

router.get("/user", controller.user);
router.get("/addUsers",controller.addUsers);
router.post("/updateUser/:id",controller.updateUser);
router.get("/editUser/:id",controller.editUser);

router.post("/createUsers",controller.createUsers);
router.delete("/deleteUsers/:id",controller.deleteUsers);

router.get("/music", controller.Music);
router.get("/addMusic",controller.addMusic);
router.post("/createMusic",controller.createMusic);
router.delete("/deleteMusic/:id",controller.deleteMusic);
router.get("/editMusic/:id",controller.editMusic);
router.post("/updateMusic/:id",controller.updateMusic);

router.get("/Challenges", controller.Challenges);
router.get("/addChallenge",controller.addChallenge);
router.post("/createChallenges",controller.createChallenges);
router.delete("/deleteChallenges/:id",controller.deleteChallenges);
router.get("/editChallenge/:id",controller.editChallenge);
router.post("/updateChallange/:id",controller.updateChallange);


router.get("/FAQ", controller.FAQ);
router.get("/addFaq",controller.addFaq);
router.post("/createFaq",controller.createFaq);
router.delete("/deleteFaq/:id",controller.deleteFaq);
router.get("/editFaq/:id",controller.editFaq);
router.post("/updateFaq/:id",controller.updateFaq);

router.get("/contactUs", controller.contactUs);

router.get("/Banner", controller.Banner);
router.get("/addBanner",controller.addBanner);
router.post("/createBanners",controller.createBanners);
router.delete("/deleteBanners/:id",controller.deleteBanners);
router.get("/editBanner/:id",controller.editBanner);
router.post("/updateBanner/:id",controller.updateBanner);



router.get("/TermConditions", controller.TermConditions);
router.get("/PrivacyPolicy", controller. PrivacyPolicy);
router.get("/aboutUs", controller. aboutUs);

module.exports = router;
