/*
* 判断浏览器 工具
*/

var Browser = {
    isIE9: function () {
        return !window.atob;
    },
    isIE10: function () {
        return !document.__proto__;
    }
}

module.exports = Browser;