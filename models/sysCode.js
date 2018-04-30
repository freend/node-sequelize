module.exports = function (sequelize, DataTypes) {
    var sysinfo = sequelize.define('codeInfo', {
        codeSeq: {
            type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'code_seq'
        },
        codeName: {
            type: DataTypes.STRING(45), field: 'code_name'
        },
        codeTitle: {
            type: DataTypes.STRING(45), field: 'code_title'
        },
        codeIndex: {
            type: DataTypes.STRING(6), field: 'code_index'
        },
        codeText: {
            type: DataTypes.STRING(45), field: 'code_text'
        }
    },{
        classMethods: {},
        tableName: 'SYS_CODE', //real table name
        freezeTableName: true, // true : table name end don't add 's'
        timestamps: false // false : don't add column createdAt, updatedAt
        // underscored: true //I use this option true, but couldn't apply to column name
    });
    return sysinfo;
}