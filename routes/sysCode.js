"use stricts";
const models = require('../models');
const async = require('async');
// const utilLangeage = require('../customUtil/utilLanguage');

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
                models.codeInfo.count().then(function (value) {
                    console.log("count : " + value);
                    callback(null, {count: value});
                });
            },
            function (callback) {
                models.codeInfo.findAll({ offset: startNum, limit: pageListNum }).then(function (value) {
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
        models.codeInfo.create({codeName: codeName, codeTitle: codeTitle,
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
        models.codeInfo.update({codeName: codeName, codeTitle: codeTitle,
            codeIndex: codeIndex, codeText: codeText}, {where:{codeSeq: codeSeq}})
            .then(function (value) {
                res.json(value);
            })
            .catch(function (reason) {
                res.json(reason);
            });
    });
    app.delete('/syscode/:codeSeq', function (req, res) {
        const delSeq = req.params.codeSeq;
        models.codeInfo.destroy({where: {codeSeq:delSeq}})
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
        models.codeInfo.findAndCountAll({
                distinct: true,
                col: 'code_title',
                attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('code_title')), 'codeTitle'], ['code_name', 'codeName']],
                offset: startNum,
                limit: pageListNum
            }).then(function (value) {
            console.log("result : " + value.rows + ", " + value.count);
            value.pageNum = pageNum;
            for (var idx in value.rows) {
                value.rows[idx].codeText = res.__(value.rows[idx].codeText);
            }
            res.json(value);
        });
    });
};