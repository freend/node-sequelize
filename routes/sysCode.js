"use stricts";
const models = require('../models');

// 1page view number
const pageListNum = 20;
var startNum = 0;

module.exports = function (app) {
    app.get('/syscode/list/:pageNum', function (req, res) {
        const pageNum = req.params.pageNum;
        console.log("path : " + req.route.path + ", " + pageNum);
        startNum = (pageNum - 1) * pageListNum;
        models.sysInfo.findAll({ offset: startNum, limit: pageListNum }).then(function (value) {
            console.log("list : " + value);
            res.json(value);
        });
    });
};