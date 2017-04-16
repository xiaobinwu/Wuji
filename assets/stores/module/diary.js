import {MY_CATEGORY_LIST} from "config/ports";
import Api, {createAction} from "utils/api";

const state = {
    //我的分类
    categoryList: []
};
const mutations = {
    [MY_CATEGORY_LIST](state, {payload}){
        state.categoryList = payload;
    }
};

const actions = {
    getCategoryList: createAction(MY_CATEGORY_LIST, Api.getCategoryList)
}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}