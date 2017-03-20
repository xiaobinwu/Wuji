import {JOURNAL_LIST} from "config/ports";

export const state = {
    journalList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    }
};
export const mutations = {
    [JOURNAL_LIST](state, {payload}){
        console.log(payload);
        state.journalList.items = payload;
    }
};
