module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define(
      "banner", {
      ...require("./cors")(Sequelize, DataTypes),
      Image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      

  
    }, {
      tableName: "banner"
    }
    )
  }
  