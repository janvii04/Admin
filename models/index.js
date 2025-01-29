const Sequelize = require("sequelize")
const challengeModel = require("./challengeModel")
const bannerModel = require("./bannerModel")
const sequelize = require("../dbConnection").sequelize

module.exports = {
    userModel: require("./userModel")(Sequelize, sequelize, Sequelize.DataTypes),
    musicModel: require("./musicModel")(Sequelize, sequelize, Sequelize.DataTypes),
    challengeModel: require("./challengeModel")(Sequelize, sequelize, Sequelize.DataTypes),
    bannerModel: require("./bannerModel")(Sequelize, sequelize, Sequelize.DataTypes),

}