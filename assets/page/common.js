/*
* 公共依赖
*/

/*
* 依赖工具类加载
*/
require('../utils/loading/loading');

/*
* 依赖组件加载
*/
// require('../page/header/header');
// require('../page/footer/footer');

/*
* 公共样式
*/
require('./main.scss');

/*
* 自定义filter
*/
Vue.filter('vdefaultlogo', {
    read: function(val){
        return val ? val : '//hstatic.hirede.com/zdh/images/defaultImg.png';
    }
});
Vue.filter('vdefaultuser', {
    read: function(val){
        return val ? val : '//hstatic.hirede.com/zdh/images/defaultUser.png';
    }
});
Vue.filter('vftoy', {
    read: function(f){
        f = parseInt(f || 0);
        var y = f / 100.0;
        return y.toFixed(2);
    }
});
/*
* 全局配置
*/
$.ajaxSetup({
    cache: false,
    timeout: 10000,
    error: function(jqXHR){
        switch (jqXHR.status){
            case(0):
                break;
            case(500):
                alert("服务器系统内部错误");
                break;
            case(401):
                alert("未登录");
                break;
            case(403):
                alert("无权限执行此操作");
                break;
            case(404):
                alert("请求不存在");
                break;
            case(408):
                alert("请求超时");
                break;
            default:
                alert("出现未知错误");
        }
    },
});
