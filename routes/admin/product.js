"use stricts";
const models = require('../../models');
const dateUtil = require('../../customUtil/utilDateTime');
const utilResult = require('../../customUtil/utilResult');
const pageSet = require('../../customUtil/responsePage');
const common = require('../../customUtil/common');
const multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
const upload = multer({ dest: 'public/img' });

module.exports = function (app, log) {
    app.get('/wshop/admin/product/list', function (req, res) {
        var resultData = Object.create(utilResult.resultForm);
        resultData.msg = "call product list";
        resultData.isProcess = true;
        pageSet.doGetResultPage(req, res, resultData);
    });
    app.post('/wshop/admin/product', upload.single('img') , function (req, res) {
        var resultData = Object.create(utilResult.resultForm);
        resultData.msg = "insert complete";
        resultData.isProcess = true;
        //////multer start//////////
        console.log("file", req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
        console.log('name', req.body.name);
        // resultData.isData.img = req.file;
        resultData.isData = {file: req.file, name: req.body.name};
        //////multer end//////////
        pageSet.doGetResultPage(req, res, resultData);
    });
};