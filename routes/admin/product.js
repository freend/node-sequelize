"use stricts";
/**
 * table join.
 * reference url : https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
 */
const models = require('../../models');
const dateUtil = require('../../customUtil/utilDateTime');
const utilResult = require('../../customUtil/utilResult');
const pageSet = require('../../customUtil/responsePage');
const listSet = require('../../customUtil/utilList');
const common = require('../../customUtil/common');
const multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
// reference url : https://wayhome25.github.io/nodejs/2017/02/21/nodejs-15-file-upload/
// reference url : http://docs.sequelizejs.com/manual/tutorial/associations.html
// 현재 상태는 단순히 업로드 경로를 지정해주는 기능만을 가지고 있다.
// const upload = multer({ dest: 'public/img' });
// 추가 기능을 넣어줍니다.
const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, 'public/img');
    },
    filename: function (req, file, callBack) {
        callBack(null, dateUtil.doGetNowToTimeStamp() + '.' + file.mimetype.split('/')[1]);
    }
});
const upload = multer({ storage: storage });

models.productInfo.hasMany(models.codeInfo, {foreignKey: 'code_index', sourceKey: 'product_category'});

module.exports = function (app, log) {
    app.get('/wshop/admin/product/list/:pageNum', function (req, res) {
        console.log(req.route.path, req.params.pageNum);
        const pageNum = req.params.pageNum;
        const listArea = listSet.doGetListArea(pageNum);
        var resultData = Object.create(utilResult.resultForm);

        models.productInfo.findAndCountAll({
            offset: listArea.startNum,
            limit: listArea.endNum,
            order: [['seq', 'DESC']],
            include: {
                model: models.codeInfo
            }
            // , attributes: ['seq', 'name', ['codeInfos'.'codeText']]
        })
            .then(function (value) {
                resultData.msg = "call product list";
                resultData.isProcess = true;
                for (var idx in value.rows) {
                    value.rows[idx]['codeInfos'][0]['dataValues']['codeText'] = res.__(value.rows[idx]['codeInfos'][0]['dataValues']['codeText']);
                }
                resultData.isData = {list: value.rows, currentPage: Number(pageNum),
                    totalPage: Math.ceil(value.count / listArea.endNum), startNum: listArea.startNum};
                resultData.viewPage = "admin/list";
                pageSet.doGetResultPage(req, res, resultData);
            })
            .catch(function (value) {
                resultData.msg = "server error";
                resultData.isProcess = false;
                resultData.errorMsg = value;
                pageSet.doGetResultPage(req, res, resultData);
            });
    });
    app.get('/wshop/admin/product/:seq', function (req, res) {
        // 제품 상세페이지 입니다.
        console.log(req.route.path, req.params.seq);
        var resultData = Object.create(utilResult.resultForm);
        models.productInfo.findOne({
                where: {
                    'product_seq': req.params.seq
                }
            })
            .then(function (value) {
                resultData.msg = "call product";
                resultData.isProcess = true;
                resultData.isData = {product: value};
                // resultData.viewPage = "admin/list";
                pageSet.doGetResultPage(req, res, resultData);
            })
            .catch(function (value) {
                resultData.msg = "server error";
                resultData.isProcess = false;
                resultData.errorMsg = value;
                pageSet.doGetResultPage(req, res, resultData);
            })
    });
    app.route('/wshop/admin/product')
        .get(function (req, res) {
            var resultData = Object.create(utilResult.resultForm);
            //여기서 제품 카테고리 정보를 가져와야 합니다.
            models.codeInfo.findAll({
                where: {
                    'code_name': 'prodCategory'
                }
            })
            .then(function (value) {
                for (var idx in value) {
                    value[idx].codeText = res.__(value[idx].codeText);
                }
                resultData.isData = {category: value};
                resultData.viewPage = 'admin/product';
                pageSet.doGetResultPage(req, res, resultData);
            })
        })
        .post(upload.single('img') , function (req, res) {
            var resultData = Object.create(utilResult.resultForm);
            // 제품 정보등의 정보를 body로 부터 받는다.
            models.productInfo.create({name: req.body.prodName, price: req.body.prodPrice, img:req.file.filename,
                stock: req.body.prodStock, position:req.body.prodPosition, category: req.body.prodCategory,
                regDate: dateUtil.doGetNowToTimeStamp(), updateDate: dateUtil.doGetNowToTimeStamp()}, {logging: log.debug})
                .then(function (value) {
                    console.log('success', value);
                    resultData.msg = "insert complete";
                    resultData.isProcess = true;
                })
                .catch(function (value) {
                    console.log('fail', value);
                    resultData.msg = "insert not complete";
                    resultData.isProcess = false;
                });
            resultData.isData = {file: req.file, name: req.body.name};
            //////multer end//////////
            pageSet.doGetResultPage(req, res, resultData);
        });
};