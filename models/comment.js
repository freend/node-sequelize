module.exports = function (sequelize, DataTypes) {
    var comment = sequelize.define('commentInfo', {
        seq: {
            type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'comment_seq'
        },
        groupSeq: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'comment_group_seq'
        },
        userSeq: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'comment_user_seq'
        },
        parentSeq: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'comment_parent_seq'
        },
        comment: {
            type: DataTypes.STRING(1000), field: 'comment_text'
        },
        type: {
            type: DataTypes.STRING(4), field: 'comment_type'
        },
        regDate: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'reg_date'
        },
        updateDate: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'update_date'
        }
    },{
        classMethods: {},
        tableName: 'COMMENT', //real table name
        freezeTableName: true, // true : table name end don't add 's'
        timestamps: false // false : don't add column createdAt, updatedAt
        // underscored: true //I use this option true, but couldn't apply to column name
    });
    return comment;
}