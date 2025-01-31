module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define(
      "FAQ", {
      ...require("./cors")(Sequelize, DataTypes),
      Question: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      
      Answer: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
  
      },
  
  
    }, 
    {
      tableName: "FAQ"
    }
    )
  }
  