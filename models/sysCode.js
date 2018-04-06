module.exports = function (sequelize, DataTypes) {
    var sysinfo = sequelize.define('sysInfo', {
        code_seq: {
            type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true
        },
        code_name: {
            type: DataTypes.STRING(45)
        },
        code_title: {
            type: DataTypes.STRING(45)
        },
        code_index: {
            type: DataTypes.STRING(6)
        },
        code_text: {
            type: DataTypes.STRING(45)
        }
    },{
        classMethods: {},
        tableName: 'SYS_INFO', //real table name
        freezeTableName: true, // true : table name end don't add 's'
        timestamps: false // false : don't add column createdAt, updatedAt
        // underscored: true //I use this option true, but couldn't apply to column name
    });
    return sysinfo;
}