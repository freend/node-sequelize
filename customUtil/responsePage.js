module.exports.doGetTest = function(){
    console.log("call response page");
};
/**
 * resultData
 * {
 *      isResult : true | false,
 *      viewPage : ejs page name,
 *      isData {
 *          ejs view datas (this part only view page)
 *      }
 * }
 * reference url : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map
 */
module.exports.doGetResultPage = function (req, res, resultData) {
    //TODO-freend 확인이 끝난후엔 제거하도록 하자.
    for(var temp in resultData) {
        console.log("result data : " + temp + ", " + resultData[temp]);
    }
    if (resultData.viewPage == null) {
        console.log("null view page");
        res.json(resultData);
    }
    else {
        console.log("not null view page");
        console.log("render data : " + resultData.isData);
        res.render(resultData.viewPage, resultData);
    }
    
};
