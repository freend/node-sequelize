module.exports = function (sequelize, DataTypes) {
    var userinfo = sequelize.define('userInfo', {
        user_seq: {
            type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true
        },
        user_access_key: {
            type: DataTypes.STRING(50)
        },
        user_id: {
            type: DataTypes.STRING(50)
        },
        user_password: {
            type: DataTypes.STRING(50)
        },
        user_name: {
            type: DataTypes.STRING(50)
        },
        user_birthday: {
            type: DataTypes.DATE
        },
        user_country: {
            type: DataTypes.STRING(5)
        },
        user_type: {
            type: DataTypes.STRING(2)
        },
        last_date: {
            type: DataTypes.DATE
        },
        reg_date: {
            type: DataTypes.DATE
        }
    },{
        classMethods: {},
        tableName: 'USER_INFO', //real table name
        freezeTableName: true, // true : table name end don't add 's'
        timestamps: false // false : don't add column createdAt, updatedAt
        // underscored: true //I use this option true, but couldn't apply to column name
    });
    return userinfo;
}