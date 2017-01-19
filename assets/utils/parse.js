/*
* 解析工具
*/
var dialog = require('./dialog/dialog');

var Parse = {
    alert: function(msg, timeout){
        dialog.alert(msg, timeout);
    },
    error: function(rtn, split){
        var errorArr = [];
        split = split ? split : ";";
        if (rtn.message) {
            return rtn.message;
        } else {
            if (rtn.data) {
                for (var q in rtn.data) {
                    var curData = rtn.data[q];
                    if ($.isArray(curData) && curData.length > 0) {
                        for (var i = 0; i < curData.length; i++) {
                            errorArr.push(curData[i]);
                        }
                    } else if (typeof curData == "string") {
                        errorArr.push(curData);
                    }
                }
                return errorArr.join(split);
            }
        }
        return "";
    },
    showError: function(rtn, split){
        var errMsg = this.error(rtn, split);
        dialog.alert(errMsg);
    },
    /*
    * url hash解析
    */
    hashUrl: function(url){
        url = url || window.location.hash;
        var hash = url.split('#')[1];
        if(!hash){
            return {};
        }
        var item, arr = hash.split('&'), rec = {};
        for(var i = 0, len = arr.length; i < len; i++){
            item = arr[i].split('=');
            rec[item[0]] = item[1];
        }
        return rec;
    },
    /*
    *拼凑url
    */
    formatUrl: function(params){
        var url = '?';
        for(var i in params) {
            url += '&' + i + '=' + params[i];
        }
        return url;
    },        
    /*
    * url query解析，获取url参数
    */    
    queryUrl: function(queryString){
        var reg = new RegExp("(^|&)" + queryString + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null){ 
            return unescape(r[2]);
        }        
    },
    /*
    * 获取默认头像
    */
    getDefaultAvatar: function(val){
        val = $.trim(val);
        return val ? val : "/Static/Images/defaultUser.png";
    }
}

module.exports = Parse;