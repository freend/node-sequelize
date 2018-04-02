module.exports = function (sequelize, DataTypes) {
    // var tablename = sequelize.define(modelname, {column setting}, {table setting});
    // return tablename
    var usercore = sequelize.define('userCores', {
        no: {
            type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true
        },
        id: {
            type: DataTypes.STRING(14), allowNull: false
        },
        gem: {
            type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0
        },
        hearts: {
            type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0
        },
        highScore: {
            type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0
        },
        loginTime: {
            type: DataTypes.DATE, defaultValue: DataTypes.NOW
        }
    });
    return usercore;
}