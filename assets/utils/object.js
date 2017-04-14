/*
* object 工具
*/

/*
* 遍历对象元素
* @params:
*/
var ObjectUtil = {
    map: function(obj, fn){
         for(var key in obj){
            var result = fn && fn(obj[key], key);
            if(result === false){
                break;
            }
        }
    },
    toStyle: function(style){
    	return JSON.stringify(style).slice(1, -2).replace(/[\"\']/g,'').split(',').join(';')
    },
    isEmptyObject: function(obj){
        for(var name in obj){
            return false;
        }
        return true;
    }
}

module.exports = ObjectUtil;