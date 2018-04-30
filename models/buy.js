module.exports = function (sequelize, DataTypes) {
    var buy = sequelize.define('buyInfo', {
        seq: {
            type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'buy_seq'
        },
        userSeq: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'buy_user_seq'
        },
        img: {
            type: DataTypes.STRING(50), field: 'buy_img_name'
        },
        amount: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'buy_amount', defaultValue: 1
        },
        state: {
            type: DataTypes.STRING(4), field: 'buy_state'
        },
        regDate: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'reg_date'
        }
    },{
        classMethods: {},
        tableName: 'BUY', //real table name
        freezeTableName: true, // true : table name end don't add 's'
        timestamps: false // false : don't add column createdAt, updatedAt
        // underscored: true //I use this option true, but couldn't apply to column name
    });
    return buy;
}