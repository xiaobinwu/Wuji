/*
* array 工具
*/

/*
* 判断数组是否已存在
* @params:
*   item: 需要判断的元素
*   key：当array为json数组时，判断是否存在的key值
*/
Array.prototype.isExist = function(item, key){
    var type = typeof this;
    for(var i = 0, len = this.length; i < len; i++){
        if((key && this[i][key] === item[key]) || (!key && this[i] === item)){
            return i;
        }
    }
    return false;
}
/*
* 数组去除空值
*/
Array.prototype.clean = function(){
    return this.filter(function(item, index){
        return item || item === 0;
    })
}

var ArrayUtil = {
    copy: function(arr){
        arr = arr || [];
        return JSON.parse(JSON.stringify(arr));
    },
    forEach: function(array, fn) {
        for (var i = 0, len = array.length; i < len; ++i) {
            var item = array[i];
            var value = fn(item, i);
            if (value === false) {
                break;
            }
        }
        return array;
    },
    forEachReverse: function(array, fn, sequence) {
        var len = array.length;
        for (var i = len - 1; i >= 0; --i) {
            var item = array[i];
            var index = i;
            if(sequence){
                index = len-1-i;
            }
            var value = fn(item, index);
            if (value === false) {
                break;
            }
        }
        return array;
    },
    findIndex: function(array, val, key){
        //找不到返回undefined，找到返回index
        var result;
        ArrayUtil.forEach(array, function(item, index){
            if(key !== undefined){
                item = item[key];
            }
            if(item === val){
                result = index;
                return false;
            }
        });
        return result;
    }
}

module.exports = ArrayUtil;