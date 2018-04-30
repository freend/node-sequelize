module.exports = function (sequelize, DataTypes) {
    var sales = sequelize.define('salesInfo', {
        seq: {
            type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'sales_seq'
        },
        userSeq: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'sales_user_seq'
        },
        price: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'sales_price'
        },
        amount: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'sales_amount', defaultValue: 1
        },
        commission: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'sales_commission'
        },
        state: {
            type: DataTypes.STRING(4), field: 'sales_state'
        },
        regDate: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'reg_date'
        },
        transDate: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'sales_trans_date'
        },
        order: {
            type: DataTypes.STRING(12), field: 'sales_order'
        }
    },{
        classMethods: {},
        tableName: 'SALES', //real table name
        freezeTableName: true, // true : table name end don't add 's'
        timestamps: false // false : don't add column createdAt, updatedAt
        // underscored: true //I use this option true, but couldn't apply to column name
    });
    return sales;
}