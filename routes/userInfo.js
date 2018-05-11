"use stricts";
const models = require('../models');
const dateUtil = require('../customUtil/utilDateTime');
const utilResult = require('../customUtil/utilResult');
const common = require('../customUtil/common');

module.exports = function (app, log) {
    /**
     * 사용 모드는 총 3가지이다. mobile, web, admin
     * 이중 mobile은 json으로 값을 넘겨주고
     * 나머지는 ejs page로 값이 나오게 할 예정이다.
     */
    app.get('/user/sample', function (req, res) {
        log.info("path : " + req.route.path);

        var sample = Object.create(resultData.resultObj);
        sample.msg = "aa";
        console.log("first : " + sample.msg);
        sample = Object.create(resultData.resultObj);
        for (var idx in sample) {
            console.log(idx + ", " + sample[idx]);
        }
        /*models.userInfo.findAll().then(function (value) {
            res.json(value);
        });*/
    });
    /**
     * add user
     */
    app.post('/user/signup', function (req, res) {
        const userId = null;//req.body.userId;
        const userPw = req.body.userPw;
        const userName = req.body.userName;
        const nowStamp = dateUtil.doGetNowToTimeStamp();
        /**
         * 여기서는 간단히 유저 유니크 키를 만들어주기 위해 간단하게 uuid를 사용할 예정이다.
         */
        const accessKey = require('uuid/v1')();

        models.userInfo.create({id: userId, password: userPw, name:userName, signDate: nowStamp,
            lastAccess:nowStamp, accessKey: accessKey, state: 'U'}, {logging: log.debug})
        .then(function (value) {
            /**
             * 5월 9, 2018 return data인 value는 const로 와서 수정이 불가능 하다 따라서 별도의 obj를 만들어서
             * 필요한 값만 넘겨줬다.
             * @type {{id, name, accessKey: *|accessKey|{type, field}|string, state}}
             */
            const resultValue = {id: value.id, name: value.name, accessKey:value.accessKey, state:value.state};
            var resultDataSet = Object.create(utilResult.resultForm);
            resultDataSet.isProcess = true;
            resultDataSet.msg = res.__("isComplete");
            resultDataSet.isData = resultValue;
            res.json(resultDataSet);
        })
        .catch(function (value) {
            log.error(value.original.sql);
            var resultDataSet = Object.create(utilResult.resultForm);
            resultDataSet.msg = res.__("notComplete");
            resultDataSet.isProcess = false;
            res.json(resultDataSet);
        });
    });

};