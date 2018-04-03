"use stricts";
const models = require('../models');

module.exports = function (app) {
    app.get('/', function (req, res) {
        console.log("path : " + req.route.path);
        models.usercore.findAll().then(function (value) {
            res.json(value);
        });
    });
};