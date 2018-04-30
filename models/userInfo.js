module.exports = function (sequelize, DataTypes) {
    var userinfo = sequelize.define('userInfo', {
        seq: {
            type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'user_seq'
        },
        accessKey: {
            type: DataTypes.STRING(50), field: 'user_access_key'
        },
        id: {
            type: DataTypes.STRING(50), field: 'user_id'
        },
        password: {
            type: DataTypes.STRING(50), field: 'user_password'
        },
        name: {
            type: DataTypes.STRING(50), field: 'user_name'
        },
        //이부분은 사용하지 않을 것이기에 주석처리 해놓습니다.
        /*user_birthday: {
            type: DataTypes.DATE, field: 'code_seq'
        },*/
        state: {
            type: DataTypes.STRING(4), field: 'user_state'
        },
        signDate: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'user_sign_date'
        },
        lastAccess: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'user_last_access'
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