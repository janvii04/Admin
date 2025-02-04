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
            password: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
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
            role: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            action: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            
        },
        {
            tableName: "user",
        }
    );
};
