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
      console.log(req.body,"fghjk")
        const { name,  email } = req.body;
        const userFile = req.files?.image;
        var userFilePath
        if (req.files && req.files.image) {
            userFilePath = await helper.userImageUpload(userFile, "Users");
        }

        const objToSave = {
            name,
            email,
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
              id: id
          }
      })

      console.log(user, "useruser")

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
                id: id
            }
        })
  
        console.log(music, "musicmusic")
  
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
      const { title, description} = req.body;

      if (!title || !description ) {
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
                id: id
            }
        })
  
        console.log(Challenges, "Challenges")
  
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
  
        const Challenges = await Models.challengeModel.findOne({ where: { id: challengeId } });
        if (!Challenges) {
            return res.status(404).send("challenge not found");
        }
  
        // // let challengeFilePath = user.image;
        // if (req.files && req.files.image) {
        //     const userFile = req.files.image;
        //     userFilePath = await helper.userImageUpload(userFile, "Users"); // Upload new image
        // }
  
        const updatedChallenge= await Models.challengeModel.update(
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

  FAQ: async (req, res) => {
    try {
      let FAQ = await Models.faqModel.findAll();
      res.render("FAQ/faqList",{FAQ});
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
      const { Question, Answer} = req.body;

      if (!Question || !Answer ) {
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

        const { id } = req.params;
        const FAQ = await Models.faqModel.findOne({
            where: {
                id: id
            }
        })
  
        console.log(FAQ, "FAQ")
  
        res.render("FAQ/ediTFaqList", { FAQ: FAQ });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
  },

  updateFaq: async (req, res) => {
    try {
        const faqId = req.params.id;
        if (!faqId) {
            return res.status(400).send("faq ID is required");
        }
  
        const FAQ = await Models.faqModel.findOne({ where: { id: faqId } });
        if (!FAQ) {
            return res.status(404).send("faq not found");
        }
  
  
        const updatedFaq= await Models.faqModel.update(
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
                id: id
            }
        })
  
        console.log(Banner, "Banner")
  
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
  
        const Banner = await Models.bannerModel.findOne({ where: { id: bannerId } });
        if (!Banner) {
            return res.status(404).send("Banner not found");
        }
  
        let bannerFilePath = Banner.image;
        if (req.files && req.files.image) {
            const bannerFile = req.files.image;
            bannerFilePath = await helper.bannerImageUpload(bannerFile, "banner"); // Upload new image
        }
  
        const updatedBanner= await Models.bannerModel.update(
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
