import {IS_SHOW_FORGET_PWD_DIALOG} from "config/ports";
import Api, {createAction} from "utils/api";

const state = {
    //是否打开忘记密码对话框
    isShowForgetPwdDialog: false
};
const mutations = {
    [IS_SHOW_FORGET_PWD_DIALOG](state, {payload}){
        state.isShowForgetPwdDialog = payload.status;
        // console.log(state.isShowForgetPwdDialog);
    }
};

const actions = {
    changeForgetPwdDialogStatus: createAction(IS_SHOW_FORGET_PWD_DIALOG)
}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}