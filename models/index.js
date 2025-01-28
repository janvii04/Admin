const Sequelize = require("sequelize")
const challengeModel = require("./challengeModel")
const sequelize = require("../dbConnection").sequelize

module.exports = {
    userModel: require("./userModel")(Sequelize, sequelize, Sequelize.DataTypes),
    musicModel: require("./musicModel")(Sequelize, sequelize, Sequelize.DataTypes),
    challengeModel: require("./challengeModel")(Sequelize, sequelize, Sequelize.DataTypes),

}