"use stricts";
const models = require('../models');
const async = require('async');

// 1page view number
const pageListNum = 20;
var startNum = 0;

module.exports = function (app) {
    app.get('/syscode/list/:pageNum', function (req, res) {
        const pageNum = req.params.pageNum;
        console.log("path : " + req.route.path + ", " + pageNum);
        startNum = (pageNum - 1) * pageListNum;
        var tasks = [
            function (callback) {
                models.sysInfo.count().then(function (value) {
                    console.log("count : " + value);
                    callback(null, {count: value});
                });
            },
            function (callback) {
                models.sysInfo.findAll({ offset: startNum, limit: pageListNum }).then(function (value) {
                    console.log("list : " + value);
                    if (value.length === 0) return callback(null, 'No Result Error');
                    callback(null, {list: value});
                });
            }
        ];

        async.series(tasks, function (err, results) {
            console.log(results);
            res.json(results);
        });
    });
    app.post('/syscode', function (req, res) {
        const codeName = req.body.codeName;
        const codeTitle = req.body.codeTitle;
        const codeIndex = req.body.codeIndex;
        const codeText = req.body.codeText;
        console.log("data : " + codeName + ", " + codeTitle + ", " + codeIndex + ", " + codeText);
        models.sysInfo.create({code_name: codeName, code_title: codeTitle,
            code_index: codeIndex, code_text: codeText}).then(function (value) {
            console.log("insert result : " + value);
            res.json(value);
        }).catch(function (err) {
            console.log("err : " + err);
        });
    });
    app.get('/syscode/sample', function (req, res) {
        async.parallel([
            function (callback) {
                models.sysInfo.count().then(function (value) {
                    console.log("count : " + value);
                    callback(null, {count: value});
                });
            },
            function (callback) {
                models.sysInfo.findAll({ offset: startNum, limit: pageListNum }).then(function (value) {
                    console.log("list : " + value);
                    if (value.length === 0) return callback(null, 'No Result Error');
                    callback(null, {list: value});
                });
            }
        ], function (err, result) {
            res.json(result);
        });
    });
};