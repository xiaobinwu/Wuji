/*
* 转换工具
*/

var Transform = {
    // 将 ‘分’ 转换为 ‘元’
    fToy: function(f){
        f = parseInt(f || 0);
        var y = f / 100.0;
        return y.toFixed(2); 
    }
}

module.exports = Transform;