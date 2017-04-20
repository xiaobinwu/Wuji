import Vue from 'vue'
import Vuex from 'vuex'

//测试
import example from './module/example'

//用户模块
import account from './module/account'

//日记模块
import diary from './module/diary'

// 公用模块引用
import {PRE_PAGE, NEXT_PAGE, GO_PAGE} from "config/ports";
import {createAction} from "utils/api";

Vue.use(Vuex)

//公用store
const state = {
	offset: 0
};

const mutations = {
	//上一页
    [PRE_PAGE](state, offset){
    	state.offset -= offset;
    },
    //下一页
	[NEXT_PAGE] (state, offset) {
	  state.offset += offset
	},
	//跳往指定页面
	[GO_PAGE] (state, offset) {
	  state.offset = offset
	}
};

const actions = {
    toPrePage: createAction(PRE_PAGE),
    toNextPage: createAction(NEXT_PAGE),
    toGoPage: createAction(GO_PAGE)
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
    modules: {
		example,
		account,
		diary
    }
})