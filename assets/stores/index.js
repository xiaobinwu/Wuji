import Vue from 'vue'
import Vuex from 'vuex'

//测试
import example from './module/example'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
		example
    }
})