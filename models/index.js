"use strict";
console.log("file : " + __dirname);
//file system.
const fs = require('fs');
//path
const path = require('path');

//dev setting NODE_ENV is undefined setting local.
const env = process.env.NODE_ENV || 'local';
//database config.
const dbConfig = require('../config/dbConfig.json')[env];
//model db
var db = {};
//Reference 1
/**
 * @type {Sequelize}
 * 위와같이 선언시 mysql schema name, user name, user pass, other info를 받는다.
 */
//sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, dbConfig);

// read this directory file use modules.
fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf('.') > 0) && (file !== 'index.js');
}).forEach(function (value) {
    //TODO : create model file after check one of two.
    // var model = sequelize.import(path.join(__dirname, value));
    var model = sequelize.import(value);
    db[model.name] = model;
});
//Reference 2
Object.keys(db).forEach(modelName => {
    if(db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;// db setting and model value.
db.Sequelize = Sequelize;// sequelize data type and function value

module.exports = db;
