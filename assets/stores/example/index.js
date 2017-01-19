import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import {state,mutations} from "./mutations";
import getters from "./getters";
Vue.use(Vuex);

Vue.config.devtools = __DEV__;

Vue.config.errorHandler = function (err, vm) {
    vm.$store.dispatch("hidePageLoading");
    console.error(err.message);
    console.error(err.stack);
    vm.$message(({message: '很抱歉，貌似出现错误了，请刷新页面重新尝试 :-)', type: 'error', showClose:true}));
};

export default new Vuex.Store({
	state,
    actions,
    mutations,
    getters,
    strict: !__DEV__
})
