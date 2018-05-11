"use stricts";
const models = require('../models');

// 1page view number
const pageListNum = 10;
var startNum = 0;

module.exports = function (app, log) {
    /**
     * detail code group list.
     */
    app.get('/syscode/detail/:codeName', function (req, res) {
        const codeName = req.params.codeName;
        console.log("path : " + req.route.path + ", " + codeName);
        models.codeInfo.findAll(
            {where: {
                'code_name': codeName}
            })
            .then(function (value) {
                for (var idx in value) {
                    value[idx].codeText = res.__(value[idx].codeText);
                }
                res.json(value);
            })
            .catch(function (reason) {
                console.log(reason);
            });
    });
    /**
     * add code
     */
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
    /**
     * update code
     */
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
    /**
     * delete code
     */
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
    /**
     * list distinct title.
     */
    app.get('/syscode/list/:pageNum', function (req, res) {
        const pageNum = req.params.pageNum;
        startNum = (pageNum - 1) * pageListNum;
        models.codeInfo.findAndCountAll({
                distinct: true,
                col: 'code_name',
                attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('code_name')), 'codeName'], ['code_title', 'codeTitle']],
                offset: startNum,
                limit: pageListNum
            }).then(function (value) {
            value.pageNum = pageNum;
            res.json(value);
        });
    });
};