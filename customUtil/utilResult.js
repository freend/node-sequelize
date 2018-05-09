/**
 * 5월 9, 2018 freend : 최초작성.
 * return json formate
 */
module.exports.doGetJsonData = function (isProcess, data) {
    return {isProcess: isProcess, isResult:data};
};