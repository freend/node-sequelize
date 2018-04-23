"use stricts";
const models = require('../models');
const async = require('async');

// 1page view number
const pageListNum = 10;
var startNum = 0;

module.exports = function (app) {
    app.get('/parallel/list/:pageNum', function (req, res) {
        const pageNum = req.params.pageNum;
        console.log("path : " + req.route.path + ", " + pageNum);
        startNum = (pageNum - 1) * pageListNum;
        var timestamp = new Date().getTime();
        async.parallel([
            function (callback) {
                models.sysInfo.count().then(function (value) {
                    console.log("count : " + value);
                    callback(null, {count: value});
                });
            },
            function (callback) {
                models.sysInfo.findAll({ offset: startNum, limit: pageListNum }).then(function (value) {
                    console.log("time : " + String(new Date().getTime() - timestamp));
                    if (value.length === 0) return callback(null, 'No Result Error');
                    callback(null, {list: value});
                });
            }
        ], function (err, result) {
            res.json(result);
        });
    });
    app.post('/syscode', function (req, res) {
        const codeName = req.body.codeName;
        const codeTitle = req.body.codeTitle;
        const codeIndex = req.body.codeIndex;
        const codeText = req.body.codeText;
        console.log("data : " + codeName + ", " + codeTitle + ", " + codeIndex + ", " + codeText);
        models.sysInfo.create({codeName: codeName, codeTitle: codeTitle,
            codeIndex: codeIndex, codeText: codeText}).then(function (value) {
            console.log("insert result : " + value);
            res.json(value);
        }).catch(function (err) {
            console.log("err : " + err);
        });
    });
    app.put('/syscode', function (req, res) {
        const codeSeq = req.body.codeSeq;
        const codeName = req.body.codeName;
        const codeTitle = req.body.codeTitle;
        const codeIndex = req.body.codeIndex;
        const codeText = req.body.codeText;
        models.sysInfo.update({codeName: codeName, codeTitle: codeTitle,
            codeIndex: codeIndex, codeText: codeText}, {where:{codeSeq: codeSeq}})
            .then(function (value) {
                res.json(value);
            })
            .catch(function (reason) {
                res.json(reason);
            });
    });
    app.get('/syscode/list/:pageNum', function (req, res) {
        const pageNum = req.params.pageNum;
        startNum = (pageNum - 1) * pageListNum;
        models.sysInfo.findAndCountAll({ offset: startNum, limit: pageListNum }).then(function (value) {
            console.log("result : " + value.rows + ", " + value.count);
            value.pageNum = pageNum;
            res.json(value);
        });
    });
};