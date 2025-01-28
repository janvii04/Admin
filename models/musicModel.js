module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define(
      "music", {
      ...require("./cors")(Sequelize, DataTypes),
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
  
      },
      music: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
  
    }, {
      tableName: "music"
    }
    )
  }
  