/**
 * 5월 9, 2018 freend : 최초작성.
 * date to timestamp
 */
module.exports.doGetNowToTimeStamp = function () {
    var stamp = "" + new Date().getTime() / 1000;
    return stamp.split('.')[0];
};
/**
 * 지역시간을 유닉스 타임 형식으로 변환합니다.
 * 기본은 날짜만 받은 후 거기에 마지막 시간인 23:59:59를 더해줍니다.
 * @param expireDate
 * @returns {number}
 */
module.exports.doGetDateToUnixDate = function (expireDate) {
    expireDate += " 23:59:59";
    return new Date(expireDate).getTime() / 1000;
}