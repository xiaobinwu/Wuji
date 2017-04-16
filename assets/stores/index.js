import Vue from 'vue'
import Vuex from 'vuex'

//测试
import example from './module/example'
//用户模块
import account from './module/account'
//日记模块
import diary from './module/diary'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
		example,
		account,
		diary
    }
})