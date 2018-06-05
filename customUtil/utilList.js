/**
 * return list start to end Number.
 * @param pageNum
 * @returns {{startNum: number, endNum: number}}
 */
module.exports.doGetListArea = function (pageNum) {
    const pageListNum = 10;
    var startNum = (pageNum - 1) * pageListNum;
    return {startNum: startNum, endNum: pageListNum};
}