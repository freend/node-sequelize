module.exports = function (sequelize, DataTypes) {
    var userinfo = sequelize.define('userInfoTab', {
        user_seq: {
            type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true
        },
        user_id: {
            type: DataTypes.STRING(1000)
        },
        user_phone: {
            type: DataTypes.STRING(45), allowNull: false
        },
        user_password: {
            type: DataTypes.STRING(50)
        },
        user_access_key: {
            type: DataTypes.STRING(50)
        },
        user_state: {
            type: DataTypes.STRING(4)
        },
        user_birthday: {
            type: DataTypes.STRING(10)
        },
        support_seq: {
            type: DataTypes.INTEGER
        },
        reg_date: {
            type: DataTypes.DATE
        },
        last_date: {
            type: DataTypes.DATE
        },
        pay_date: {
            type: DataTypes.DATE
        },
        company: {
            type: DataTypes.STRING(12)
        },
        sign_date: {
            type: DataTypes.DATE
        },
        user_country: {
            type: DataTypes.STRING(10)
        },
        user_language: {
            type: DataTypes.STRING(10)
        },
        user_import_type: {
            type: DataTypes.STRING(45)
        },
        user_read_notice: {
            type: DataTypes.INTEGER
        },
        info_msg_state: {
            type: DataTypes.STRING(2)
        },
        user_nick: {
            type: DataTypes.STRING(45)
        },
        user_sex: {
            type: DataTypes.STRING(2)
        },
        user_today_access: {
            type: DataTypes.INTEGER
        },
        user_total_access: {
            type: DataTypes.INTEGER
        },
        user_bg_image: {
            type: DataTypes.INTEGER
        },
        user_box_image: {
            type: DataTypes.INTEGER
        },
        user_mail_image: {
            type: DataTypes.INTEGER
        },
        user_new_alarm: {
            type: DataTypes.STRING(2)
        }
    },{
        classMethods: {},
        tableName: 'USER_INFO_TAB', //real table name
        freezeTableName: true, // true : table name end don't add 's'
        timestamps: false // false : don't add column createdAt, updatedAt
        // underscored: true //I use this option true, but couldn't apply to column name
    });
    return userinfo;
}