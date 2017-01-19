/*
* enum 工具
*/

var enumdata = require('../config/enumerate.json');

var EnumUtil = {
    publicitysingle: function(){
         return enumdata.publicitytype;
    },
    publicitycombo: function(){
         return [{
            "value": "",
            "text": "请选择任务类型"
         }].concat(enumdata.publicitytype);
    },
    paymentscombo: function(){
         return [{
            "value": "",
            "text": "请选择收支方向"
         }].concat(enumdata.paymentstype);
    },
    contactstypesingle: function(){
         return [{
            "value": "",
            "text": "不限"
         }].concat(enumdata.contactstype);
    }

}

module.exports = EnumUtil;