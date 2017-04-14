import {JOURNAL_LIST} from "config/ports";
import Api, {createAction} from "utils/api";

const state = {
    journalList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    }
};
const mutations = {
    [JOURNAL_LIST](state, {payload}){
        console.log(payload);
        state.journalList.items = payload;
    }
};

const actions = {
    getJournalList: createAction(JOURNAL_LIST, Api.getJournalList)
}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}