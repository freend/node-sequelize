"use stricts";
const models = require('../../models');
const dateUtil = require('../../customUtil/utilDateTime');
const utilResult = require('../../customUtil/utilResult');
const pageSet = require('../../customUtil/responsePage');
const common = require('../../customUtil/common');
const multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
// reference url : https://wayhome25.github.io/nodejs/2017/02/21/nodejs-15-file-upload/
// 현재 상태는 단순히 업로드 경로를 지정해주는 기능만을 가지고 있다.
// const upload = multer({ dest: 'public/img' });
// 추가 기능을 넣어줍니다.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

module.exports = function (app, log) {
    app.get('/wshop/admin/product/list', function (req, res) {
        var resultData = Object.create(utilResult.resultForm);
        resultData.msg = "call product list";
        resultData.isProcess = true;
        pageSet.doGetResultPage(req, res, resultData);
    });
    app.post('/wshop/admin/product', upload.single('img') , function (req, res) {
        var resultData = Object.create(utilResult.resultForm);
        // 제품 정보등의 정보를 body로 부터 받는다.
        // name : 이름, price : 가격, name : 이름, img : 이미지 명, stock : 수량, position : 제고위치
        // category : 제품분류, regDate : 등록일, updateDate : 변경일.
        resultData.msg = "insert complete";
        resultData.isProcess = true;
        //////multer start//////////
        console.log("file", req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.

        // resultData.isData.img = req.file;
        resultData.isData = {file: req.file, name: req.body.name};
        //////multer end//////////
        pageSet.doGetResultPage(req, res, resultData);
    });
};