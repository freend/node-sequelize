module.exports = function (sequelize, DataTypes) {
    var product = sequelize.define('productInfo', {
        seq: {
            type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'product_seq'
        },
        name: {
            type: DataTypes.STRING(45), field: 'product_name'
        },
        img: {
            type: DataTypes.STRING(45), field: 'product_img'
        },
        price: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'product_price'
        },
        stock: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'product_stock'
        },
        position: {
            type: DataTypes.STRING(50), field: 'product_position'
        },
        category: {
            type: DataTypes.STRING(4), field: 'product_category'
        },
        regDate: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'reg_date'
        },
        updateDate: {
            type: DataTypes.INTEGER.UNSIGNED, field: 'update_date'
        }
    },{
        classMethods: {},
        tableName: 'PRODUCT', //real table name
        freezeTableName: true, // true : table name end don't add 's'
        timestamps: false // false : don't add column createdAt, updatedAt
        // underscored: true //I use this option true, but couldn't apply to column name
    });
    return product;
}