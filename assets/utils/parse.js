/*
* 解析工具
*/
var Parse = {
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
    }
}

module.exports = Parse;