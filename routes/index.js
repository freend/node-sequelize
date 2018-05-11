"use stricts";
const models = require('../models');
const common = require('../customUtil/common');
const pageSet = require('../customUtil/responsePage');
const utilResult = require('../customUtil/utilResult');

module.exports = function (app, log) {
    /**
     * 5월 11, 2018
     * 사용 모드는 총 3가지이다. mobile, web, admin
     * 이중 mobile은 json으로 값을 넘겨주고
     * 나머지는 ejs page로 값이 나오게 할 예정이다.
     * 확인 결과 정상적으로 두개를 읽어드릴 수 있음을 확인함.
     */
    app.post('/wshop/:type', function (req, res) {
        console.log("post : " + req.route.path);
        const mode = req.params.type;
        const names = req.body.name;
        common.doGetSessionCheck(req, res, mode);
        var resultDataSet = Object.create(utilResult.resultForm);
        resultDataSet.isProcess = true;
        resultDataSet.isData = {type: mode, name:names};
        pageSet.doGetResultPage(req, res, resultDataSet);
    });
    app.get('/wshop/:type', function (req, res) {
        console.log("get : " + req.route.path);
        const mode = req.params.type;
        common.doGetSessionCheck(req, res, mode);
        var resultDataSet = Object.create(utilResult.resultForm);
        resultDataSet.isProcess = true;
        resultDataSet.isData = {mode: mode};
        console.log("call this command");
        pageSet.doGetResultPage(req, res, resultDataSet);
    });
    app.get('/wshop/:type/login', function (req, res) {
        const userMode = req.params.type;
        var resultDataSet = Object.create(utilResult.resultForm);
        resultDataSet.isProcess = true;
        resultDataSet.isData = {mode: userMode};
        resultDataSet.viewPage = 'common/login';
        pageSet.doGetResultPage(req, res, resultDataSet);
    });
};