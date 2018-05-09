"use stricts";
const models = require('../models');
const dateUtil = require('../customUtil/utilDataTime');
const resultData = require('../customUtil/utilResult');

module.exports = function (app) {
    app.get('/user/sample', function (req, res) {
        console.log("path : " + req.route.path + ", sample");
        /*models.userInfo.findAll().then(function (value) {
            res.json(value);
        });*/
    });
    /**
     * add user
     */
    app.post('/user/signup', function (req, res) {
        const userId = req.body.userId;
        const userPw = req.body.userPw;
        const userName = req.body.userName;
        const nowStamp = dateUtil.doGetNowToTimeStamp();
        /**
         * 여기서는 간단히 유저 유니크 키를 만들어주기 위해 간단하게 uuid를 사용할 예정이다.
         */
        const accessKey = require('uuid/v1')();

        models.userInfo.create({id: userId, password: userPw, name:userName, signDate: nowStamp,
            lastAccess:nowStamp, accessKey: accessKey, state: 'U'})
        .then(function (value) {
            /**
             * 5월 9, 2018 return data인 value는 const로 와서 수정이 불가능 하다 따라서 별도의 obj를 만들어서
             * 필요한 값만 넘겨줬다.
             * 여기 부분은 추후 개발이 더 필요한 부분이다.
             * @type {{id, name, accessKey: *|accessKey|{type, field}|string, state}}
             */
            const resultValue = {id: value.id, name: value.name, accessKey:value.accessKey, state:value.state};
            var isData = {msg: "정상적으로 처리되었습니다.",
                    isData: resultValue
                };
                res.json(resultData.doGetJsonData(true, isData));
        })
        .catch(function (value) {
            /**
             * error part.
             * "original": {
                "code": "ER_BAD_NULL_ERROR",
                "errno": 1048,
                "sqlState": "23000",
                "sqlMessage": "Column 'user_id' cannot be null",
                "sql": "INSERT INTO `USER_INFO` (`user_seq`,`user_access_key`,`user_id`,`user_password`,`user_name`,`user_state`,`user_sign_date`,`user_last_access`) VALUES (DEFAULT,'b24120f0-5372-11e8-a041-b7df88fadb9b',NULL,'chltnaks','freend choi','U',1525861271.678,1525861271.678);"
            }
             여기서 필요부분을 서버로 전달하고 변경된 값을 클라이언트로 보내도록 하자.
             */
            res.json(resultData.doGetJsonData(false, value));
        });
    })
};