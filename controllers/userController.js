const Models = require("../models/index");
const helper = require("../helpers/fileUpload");
const bcrypt = require("bcrypt");

module.exports = {
  logIn: async (req, res) => {
    try {
      res.render("loginPage");
    } catch (error) {
      throw error;
    }
  },
  // logInDone: async (req, res) => {
  //   try {
  //     console.log("req.body", req.body);

  //     let user = await Models.userModel.findOne({
  //       where: {
  //         email: req.body.email,
  //         password: req.body.password,
  //         role: 0,
  //       },
  //       raw: true,
  //     });
  //     console.log("user======", user);
  //     const hashedPassword = await bcrypt.compare();
  //     if (!user) {
  //       return res.send("User not found");
  //     } else {
  //       req.session.user = user;
  //       res.redirect("/dashboard");
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  logInDone: async (req, res) => {
    try {
      console.log("req.body:", req.body);

      const { email, password } = req.body;

      let user = await Models.userModel.findOne({
        where: { email, role: 0 },
        raw: true
      });

      console.log("user:", user);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.user = user;

      res.redirect("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  signUp: async (req, res) => {
    try {
      const userCount = await Models.userModel.count();
      const musicCount = await Models.musicModel.count();
      const challengeCount = await Models.challengeModel.count();
      const contactCount = await Models.contactUsModel.count();
      const faqCount = await Models.faqModel.count();
      const bannerCount = await Models.bannerModel.count(); // Add banner count if applicable

      res.render("dashboard", {
        userCount,
        musicCount,
        challengeCount,
        contactCount,
        faqCount,
        bannerCount, // Ensure this is included
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  user: async (req, res) => {
    try {
      let user = await Models.userModel.findAll();

      res.render("users/userList", { user });
    } catch (error) {
      throw error;
      res.render("users/userList", { user: [] });
    }
  },

  addUsers: async (req, res) => {
    try {
      res.render("users/addUserList");
    } catch (error) {
      throw error;
    }
  },

  createUsers: async (req, res) => {
    try {
      console.log(req.body, "fghjk");
      const { name, email, role, password } = req.body;
      const userFile = req.files?.image;
      var userFilePath;
      if (req.files && req.files.image) {
        userFilePath = await helper.userImageUpload(userFile, "Users");
      }

      const objToSave = {
        name,
        email,
        role,
        password,
        image: userFilePath,
      };

      await Models.userModel.create(objToSave);

      res.redirect("/user");
    } catch (error) {
      console.error("Error adding user:", error);
      res.redirect("/user");
    }
  },

  editUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Models.userModel.findOne({
        where: {
          id: id,
        },
      });

      console.log(user, "useruser");

      res.render("users/editUserList", { user: user });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(400).send("User ID is required");
      }

      const user = await Models.userModel.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).send("User not found");
      }

      let userFilePath = user.image;
      if (req.files && req.files.image) {
        const userFile = req.files.image;
        userFilePath = await helper.userImageUpload(userFile, "Users"); // Upload new image
      }

      const updatedUser = await Models.userModel.update(
        {
          image: userFilePath,
          name: req.body.name,
          email: req.body.email,
        },
        { where: { id: userId } }
      );

      console.log(updatedUser, "updatedUserupdatedUser");

      res.redirect("/user");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating user");
    }
  },

  deleteUsers: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(403).json({ message: "id is required" });
      }
      await Models.userModel.destroy({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ status: 200, message: "user deleted succesfully" });
    } catch (error) {
      throw error;
    }
  },

  Music: async (req, res) => {
    try {
      const musicData = await Models.musicModel.findAll();

      res.render("music/musicList", { musicData });
    } catch (error) {
      throw error;
      res.render("music/musicList", { musicData: [] });
    }
  },

  addMusic: async (req, res) => {
    try {
      res.render("music/addMusicList");
    } catch (error) {
      throw error;
    }
  },

  createMusic: async (req, res) => {
    try {
      const { MusicTitle: title, MusicDescription: description } = req.body;
      const musicFile = req.files?.myfile;

      if (!musicFile) {
        console.error("No music file uploaded.");
        return res.redirect("/music");
      }

      console.log("Uploaded file:", musicFile);

      // Check allowed MIME types
      const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];
      if (!allowedMimeTypes.includes(musicFile.mimetype)) {
        console.error("Invalid MIME type.");
        return res.redirect("/music");
      }

      // Check file size (10 MB limit)
      const maxFileSize = 10 * 1024 * 1024;
      if (musicFile.size > maxFileSize) {
        console.error("File size exceeds the limit.");
        return res.redirect("/music");
      }

      // Upload the file
      const musicFilePath = await helper.fileUpload(musicFile, "Musics");

      if (!musicFilePath) {
        console.error("File upload failed.");
        return res.redirect("/music");
      }

      // Save to database
      const objToSave = {
        title,
        description,
        music: musicFilePath,
      };
      console.log("Saving object:", objToSave);

      await Models.musicModel.create(objToSave);

      // Redirect to the music listing page
      res.redirect("/music");
    } catch (error) {
      console.error("Error adding music:", error);
      res.redirect("/music");
    }
  },

  deleteMusic: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(403).json({ message: "id is required" });
      }
      await Models.musicModel.destroy({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ status: 200, message: "music deleted succesfully" });
    } catch (error) {
      throw error;
    }
  },

  editMusic: async (req, res) => {
    try {
      const { id } = req.params;
      const music = await Models.musicModel.findOne({
        where: {
          id: id,
        },
      });

      console.log(music, "musicmusic");

      res.render("music/editmusicList", { music: music });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateMusic: async (req, res) => {
    try {
      const musicId = req.params.id;
      if (!musicId) {
        return res.status(400).send("music ID is required");
      }

      const music = await Models.musicModel.findOne({ where: { id: musicId } });
      if (!music) {
        return res.status(404).send("music not found");
      }

      let musicFilePath = music.music;
      if (req.files && req.files.music) {
        const musicFile = req.files.music;
        musicFilePath = await helper.fileUpload(musicFile, "music"); // Upload new music
      }

      const updatedMusic = await Models.musicModel.update(
        {
          music: musicFilePath,
          title: req.body.title,
          description: req.body.description,
        },
        { where: { id: musicId } }
      );

      console.log(updatedMusic, "updatedMusicupdatedMusic");

      res.redirect("/music");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating music");
    }
  },

  Challenges: async (req, res) => {
    try {
      let challenges = await Models.challengeModel.findAll();
      res.render("challenges/challengesList", { challenges });
    } catch (error) {
      // throw error;
      res.render("challenges/challengesList", { challenges: [] });
    }
  },

  addChallenge: async (req, res) => {
    try {
      res.render("challenges/addChallengeList");
    } catch (error) {
      throw error;
    }
  },

  createChallenges: async (req, res) => {
    try {
      // Destructure and validate request body
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "All fields (title, description) are required.",
        });
      }

      // Create object to save
      const objToSave = { title, description };
      console.log("Saving challenge:", objToSave);

      // Save to database
      await Models.challengeModel.create(objToSave);

      // Respond with success
      res.redirect("/Challenges");
    } catch (error) {
      console.error("Error adding challenge:", error);

      // Respond with error
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the challenge.",
        error: error.message,
      });
    }
  },

  deleteChallenges: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(403).json({ message: "id is required" });
      }
      await Models.challengeModel.destroy({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ status: 200, message: "challenges deleted succesfully" });
    } catch (error) {
      throw error;
    }
  },

  editChallenge: async (req, res) => {
    try {
      const { id } = req.params;
      const Challenges = await Models.challengeModel.findOne({
        where: {
          id: id,
        },
      });

      console.log(Challenges, "Challenges");

      res.render("Challenges/editChallengeList", { Challenges: Challenges });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateChallange: async (req, res) => {
    try {
      const challengeId = req.params.id;
      if (!challengeId) {
        return res.status(400).send("Challenges ID is required");
      }

      const Challenges = await Models.challengeModel.findOne({
        where: { id: challengeId },
      });
      if (!Challenges) {
        return res.status(404).send("challenge not found");
      }

      // // let challengeFilePath = user.image;
      // if (req.files && req.files.image) {
      //     const userFile = req.files.image;
      //     userFilePath = await helper.userImageUpload(userFile, "Users"); // Upload new image
      // }

      const updatedChallenge = await Models.challengeModel.update(
        {
          title: req.body.title,
          description: req.body.description,
        },
        { where: { id: challengeId } }
      );

      console.log(updatedChallenge, "updatedChallengeupdatedChallenge");

      res.redirect("/Challenges");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating Challenges");
    }
  },

  ContactUs: async (req, res) => {
    try {
      let ContactUs = await Models.contactUsModel.findAll();
      res.render("ContactUs/contactUsList", { ContactUs });
    } catch (error) {
      // throw error;
      res.render("ContactUs/contactUsList", { ContactUs: [] });
    }
  },

  addContact: async (req, res) => {
    try {
      res.render("contactUs/addContactList");
    } catch (error) {
      throw error;
    }
  },

  createContact: async (req, res) => {
    try {
      // Destructure and validate request body
      const { name, email, message, date } = req.body;

      if (!name || !email || !message || !date) {
        return res.status(400).json({
          success: false,
          message: "All fields (name, email,message,date) are required.",
        });
      }

      // Create object to save
      const objToSave = { name, email, message, date };
      console.log("Saving contact:", objToSave);

      // Save to database
      await Models.contactUsModel.create(objToSave);

      // Respond with success
      res.redirect("/ContactUs");
    } catch (error) {
      console.error("Error adding contact:", error);

      // Respond with error
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the contact.",
        error: error.message,
      });
    }
  },

  deleteContact: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(403).json({ message: "id is required" });
      }
      await Models.contactUsModel.destroy({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ status: 200, message: "contact deleted succesfully" });
    } catch (error) {
      throw error;
    }
  },

  editContact: async (req, res) => {
    try {
      const { id } = req.params;
      const ContactUs = await Models.contactUsModel.findOne({
        where: {
          id: id,
        },
      });

      console.log(ContactUs, "ContactUs");

      res.render("ContactUs/editContactList", { ContactUs: ContactUs });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  // updateContact: async (req, res) => {
  //   try {
  //     const contactId = req.params.id;
  //     if (!contactId) {
  //       return res.status(400).send("contact ID is required");
  //     }

  //     const ContactUs = await Models.contactUsModel.findOne({
  //       where: { id: contactId },
  //     });
  //     if (!ContactUs) {
  //       return res.status(404).send("ContactUs not found");
  //     }

  //     const updatedContact = await Models.contactUsModel.update(
  //       {
  //         name: req.body.name,
  //         email: req.body.email,
  //         message: req.body.message,

  //         date : req.body.date,

  //       },
  //       { where: { id: contactId } }
  //     );

  //     console.log(updatedContact, "updatedContactupdatedContact");

  //     res.redirect("/ContactUs");
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("Error updating ContactUs");
  //   }
  // },

  updateContact: async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(400).send("userId is required");
      }

      const user = await Models.contactUsModel.findOne({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).send("user not found");
      }

      const updatedContact = await Models.contactUsModel.update(
        {
          name: req.body.name,
          email: req.body.email,
          message: req.body.message,
          date: req.body.date,
        },
        { where: { id: userId } }
      );

      console.log(updatedContact, "updatedContactupdatedContact");

      res.redirect("/ContactUs");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating ContactUs");
    }
  },

  FAQ: async (req, res) => {
    try {
      let FAQ = await Models.faqModel.findAll();
      res.render("FAQ/faqList", { FAQ });
    } catch (error) {
      throw error;
    }
  },

  addFaq: async (req, res) => {
    try {
      res.render("FAQ/addFaqList");
    } catch (error) {
      throw error;
    }
  },

  createFaq: async (req, res) => {
    try {
      // Destructure and validate request body
      const { Question, Answer } = req.body;

      if (!Question || !Answer) {
        return res.status(400).json({
          success: false,
          message: "All fields (title, description) are required.",
        });
      }

      // Create object to save
      const objToSave = { Question, Answer };
      console.log("Saving FAq:", objToSave);

      // Save to database
      await Models.faqModel.create(objToSave);

      // Respond with success
      res.redirect("/FAQ");
    } catch (error) {
      console.error("Error adding FAQ:", error);

      // Respond with error
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the FAQ.",
        error: error.message,
      });
    }
  },

  deleteFaq: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(403).json({ message: "id is required" });
      }
      await Models.faqModel.destroy({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ status: 200, message: "faq deleted succesfully" });
    } catch (error) {
      throw error;
    }
  },

  editFaq: async (req, res) => {
    try {
      // const id = req.params.id
      const { id } = req.params;
      const FAQ = await Models.faqModel.findOne({
        where: {
          id: id,
        },
      });

      console.log(FAQ, "FAQ");

      res.render("FAQ/ediTFaqList", { FAQ: FAQ });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateFaq: async (req, res) => {
    try {
      const faqId = req.body.id;
      if (!faqId) {
        return res.status(400).send("faq ID is required");
      }

      const FAQ = await Models.faqModel.findOne({ where: { id: faqId } });
      if (!FAQ) {
        return res.status(404).send("faq not found");
      }

      const updatedFaq = await Models.faqModel.update(
        {
          Question: req.body.Question,
          Answer: req.body.Answer,
        },
        { where: { id: faqId } }
      );

      console.log(updatedFaq, "updatedFaqupdatedFaq");

      res.redirect("/FAQ");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating faq");
    }
  },

  contactUs: async (req, res) => {
    try {
      res.render("Contact_Us/contactUsList");
    } catch (error) {
      throw error;
    }
  },

  Banner: async (req, res) => {
    try {
      let Banner = await Models.bannerModel.findAll();

      res.render("Banners/bannerList", { Banner });
    } catch (error) {
      throw error;
      res.render("Banners/bannerList", { Banner: [] });
    }
  },

  addBanner: async (req, res) => {
    try {
      res.render("Banners/addBannerList");
    } catch (error) {
      throw error;
    }
  },

  createBanners: async (req, res) => {
    try {
      const bannerFile = req.files?.Image;
      var bannerFilePath;
      if (req.files && req.files.Image) {
        bannerFilePath = await helper.bannerImageUpload(bannerFile, "Banners");
      }

      const objToSave = { Image: bannerFilePath };

      await Models.bannerModel.create(objToSave);

      res.redirect("/Banner");
    } catch (error) {
      console.error("Error adding Banner:", error);
      res.redirect("/Banner");
    }
  },

  deleteBanners: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(403).json({ message: "id is required" });
      }
      await Models.bannerModel.destroy({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ status: 200, message: "banner deleted succesfully" });
    } catch (error) {
      throw error;
    }
  },

  editBanner: async (req, res) => {
    try {
      const { id } = req.params;
      const Banner = await Models.bannerModel.findOne({
        where: {
          id: id,
        },
      });

      console.log(Banner, "Banner");

      res.render("Banners/editBannerList", { Banner: Banner });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateBanner: async (req, res) => {
    try {
      const bannerId = req.params.id;
      if (!bannerId) {
        return res.status(400).send("Banner ID is required");
      }

      const Banner = await Models.bannerModel.findOne({
        where: { id: bannerId },
      });
      if (!Banner) {
        return res.status(404).send("Banner not found");
      }

      let bannerFilePath = Banner.image;
      if (req.files && req.files.image) {
        const bannerFile = req.files.image;
        bannerFilePath = await helper.bannerImageUpload(bannerFile, "banner"); // Upload new image
      }

      const updatedBanner = await Models.bannerModel.update(
        {
          image: bannerFilePath,
        },
        { where: { id: bannerId } }
      );

      console.log(updatedBanner, "updatedBannerpdatedBanner");

      res.redirect("/Banners");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating Banner");
    }
  },

  TermConditions: async (req, res) => {
    try {
      let termsData = await Models.cmsModel.findOne({ where: { type: 1 } });
      console.log("termsData", termsData);
      res.render("Terms&Conditions/termConditionsList", { termsData });
    } catch (error) {
      throw error;
    }
  },

  updateTermConditions: async (req, res) => {
    try {
      const { id, description } = req.body;

      const findcms = await Models.cmsModel.findOne({
        where: {
          type: 1,
        },
      });

      if (findcms) {
        const updated = await Models.cmsModel.update(
          { description: description },
          { where: { type: 1 } }
        );
      } else {
        await Models.cmsModel.create({
          title: "Terms & Conditions",
          description: description,
          type: 1,
        });
      }

      res.redirect("/TermConditions");
    } catch (error) {
      throw error;
    }
  },

  PrivacyPolicy: async (req, res) => {
    try {
      let privacyData = await Models.cmsModel.findOne({ where: { type: 2 } });

      res.render("PrivacyPolicy/privacyPolicyList", { privacyData });
    } catch (error) {
      throw error;
    }
  },

  updatePrivacyPolicy: async (req, res) => {
    try {
      const { id, description } = req.body;

      const findcms = await Models.cmsModel.findOne({
        where: {
          type: 2,
        },
      });

      if (findcms) {
        const updated = await Models.cmsModel.update(
          { description: description },
          { where: { type: 2 } }
        );
      } else {
        await Models.cmsModel.create({
          title: "PrivacyPolicy",
          description: description,
          type: 2,
        });
      }

      res.redirect("/PrivacyPolicy");
    } catch (error) {
      throw error;
    }
  },

  aboutUs: async (req, res) => {
    try {
      let aboutData = await Models.cmsModel.findOne({ where: { type: 3 } });
      console.log("aboutData", aboutData);
      res.render("aboutUs/aboutUsList", { aboutData });
    } catch (error) {
      throw error;
    }
  },

  updateAboutUs: async (req, res) => {
    try {
      const { id, description } = req.body;

      const findcms = await Models.cmsModel.findOne({
        where: {
          type: 3,
        },
      });

      if (findcms) {
        const updated = await Models.cmsModel.update(
          { description: description },
          { where: { type: 3 } }
        );
      } else {
        await Models.cmsModel.create({
          title: "About Us",
          description: description,
          type: 3,
        });
      }

      res.redirect("/aboutUs");
    } catch (error) {
      throw error;
    }
  },

  test: async (req, res) => {
    try {
      let objToSave = {
        role: 0,
        email: " jeevan@gmail.com",
        password: hashedPassword,
      };
      await Models.userModel.create(objToSave);
    } catch (error) {}
  },
};
