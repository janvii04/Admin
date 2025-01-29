module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define(
        "user",
        {
            ...require("./cors")(Sequelize, DataTypes),
            image: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            // nickName: {
            //     type: DataTypes.STRING(255),
            //     allowNull: true,
            //     defaultValue: null,
            // },
            email: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            // status: {
            //     type: DataTypes.STRING(255),
            //     allowNull: true,
            //     defaultValue: null,
            // },
            // action: {
            //     type: DataTypes.STRING(255),
            //     allowNull: true,
            //     defaultvalue: null,
            // }
        },
        {
            tableName: "user",
        }
    );
};
