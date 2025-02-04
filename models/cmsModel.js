module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define(
        "cmsModel",
        {
            ...require("./cors")(Sequelize, DataTypes),
            title: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: null,
            },
            type: {
                type: DataTypes.INTEGER,  // 1 for terms and conditions 2 for privarcy policy 3 for about us 
                allowNull: true,
                defaultValue: null,
            },
        },
        {
            tableName: "cmsModel",
        }
    );
};
