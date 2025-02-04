const Sequelize = require("sequelize")
const sequelize = require("../dbConnection").sequelize

module.exports = {
    userModel: require("./userModel")(Sequelize, sequelize, Sequelize.DataTypes),
    musicModel: require("./musicModel")(Sequelize, sequelize, Sequelize.DataTypes),
    challengeModel: require("./challengeModel")(Sequelize, sequelize, Sequelize.DataTypes),
    bannerModel: require("./bannerModel")(Sequelize, sequelize, Sequelize.DataTypes),
    faqModel: require("./faqModel")(Sequelize, sequelize, Sequelize.DataTypes),
    cmsModel: require("./cmsModel")(Sequelize, sequelize, Sequelize.DataTypes),
    contactUsModel: require("./contactUsModel")(Sequelize, sequelize, Sequelize.DataTypes),

}