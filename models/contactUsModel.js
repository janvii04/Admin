module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define(
      "ContactUs", {
      ...require("./cors")(Sequelize, DataTypes),
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
  
      },

      message: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      
      date: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
  
      },
  
    }, {
      tableName: "ContactUs"
    }
    )
  }
  