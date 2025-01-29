const Models = require("../models/index");
const helper = require("../helpers/fileUpload");

module.exports = {

logIn: async (req,res)=>{
  try {
    res.render("loginPage");
  } catch (error) {
    throw error;
  }
},

  signUp: async (req, res) => {
    try {
      res.render("dashboard");
    } catch (error) {
      throw error;
    }
  },

  user: async (req, res) => {
    try {
     let user = await Models.userModel.findAll();

      res.render("users/userList", { user});
    } catch (error) {
      throw error;
      res.render("users/userList", { user: []});

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
        const { name,  email } = req.body;
        const userFile = req.files?.Image;
        var userFilePath
        if (req.files && req.files.Image) {
            userFilePath = await helper.imageUpload(userFile, "Users");
        }

        const objToSave = {
            name,
            email,
            
            image: userFilePath,
        };

        await Models.userModel.create(objToSave);

        res.redirect("/users");
    } catch (error) {
        console.error("Error adding music:", error);
        res.redirect("/users");
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
      const { title, description, action } = req.body;

      if (!title || !description || !action) {
        return res.status(400).json({
          success: false,
          message: "All fields (title, description, action) are required.",
        });
      }

      // Create object to save
      const objToSave = { title, description, action };
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

  FAQ: async (req, res) => {
    try {
      res.render("FAQ/faqList");
    } catch (error) {
      throw error;
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
      const userFile = req.files?.Image;
      var userFilePath;
      if (req.files && req.files.Image) {
        userFilePath = await helper.imageUpload(userFile, "Users");
      }

      const objToSave = { Image: userFilePath };

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

  TermConditions: async (req, res) => {
    try {
      res.render("Terms&Conditions/termConditionsList");
    } catch (error) {
      throw error;
    }
  },

  PrivacyPolicy: async (req, res) => {
    try {
      res.render("PrivacyPolicy/privacyPolicy");
    } catch (error) {
      throw error;
    }
  },

  aboutUs: async (req, res) => {
    try {
      res.render("aboutUs/aboutUsList");
    } catch (error) {
      throw error;
    }
  },
};
