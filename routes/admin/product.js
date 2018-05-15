"use stricts";
const models = require('../../models');
const dateUtil = require('../../customUtil/utilDateTime');
const utilResult = require('../../customUtil/utilResult');
const pageSet = require('../../customUtil/responsePage');
const common = require('../../customUtil/common');

module.exports = function (app, log) {
    app.get('/wshop/admin/product/list', function (req, res) {
        var resultData = Object.create(utilResult.resultForm);
        resultData.msg = "call product list";
        resultData.isProcess = true;
        pageSet.doGetResultPage(req, res, resultData);
    })
};