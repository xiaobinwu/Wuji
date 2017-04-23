import Vue from 'vue'
import Vuex from 'vuex'

//测试
import passing from './module/passing'

//用户模块
import account from './module/account'

//日记模块
import diary from './module/diary'

// 公用模块引用
import {PRE_PAGE, NEXT_PAGE, GO_PAGE, RESET_OFFSET} from "config/ports";
import {createAction} from "utils/api";

Vue.use(Vuex)

//公用store
const state = {
	offset: 0
};

const mutations = {
	//上一页
    [PRE_PAGE](state, {payload}){
    	state.offset -= payload.offset;
    },
    //下一页
	[NEXT_PAGE] (state, {payload}) {
		state.offset += payload.offset;
	},
	//跳往指定页面
	[GO_PAGE] (state, {payload}) {
		state.offset = payload.offset;
	},
	//重置offset
	[RESET_OFFSET](state){
		state.offset = 0;
	}
};

const actions = {
    toPrePage: createAction(PRE_PAGE),
    toNextPage: createAction(NEXT_PAGE),
    toGoPage: createAction(GO_PAGE),
    resetOffset: createAction(RESET_OFFSET)
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
    modules: {
		passing,
		account,
		diary
    }
})