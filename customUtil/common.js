/**
 * result format
 */
var viewFormat = require('../customUtil/responsePage.js');

module.exports.doGetSelectMsg = function (result) {
    var msg = "";
    if(result.length == 0) {
        msg = "조회된 내역이 없습니다.";
    }
    else {
        msg = "조회된 결과를 가져왔습니다.";
    }
    return msg;
}
module.exports.doGetInsertUpdateMsg = function (result) {
    var msg = "";
    if(result["affectedRows"] == 1) {
        msg = "정상적으로 등록되었습니다.";
    }
    else {
        msg = "등록에 실패하였습니다.";
    }
    return msg;
};