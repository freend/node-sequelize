module.exports = function (sequelize, DataTypes) {
    var basket = sequelize.define('basketInfo', {
        seq: {
            type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'basket_seq'
        },
        userSeq: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'basket_user_seq'
        },
        prodSeq: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'basket_prod_seq'
        },
        regDate: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'reg_date'
        }
    },{
        classMethods: {},
        tableName: 'BASKET', //real table name
        freezeTableName: true, // true : table name end don't add 's'
        timestamps: false // false : don't add column createdAt, updatedAt
        // underscored: true //I use this option true, but couldn't apply to column name
    });
    return basket;
}