import {JOURNAL_LIST, PASSING_DETAIL, PASSING_COLLECTION, PASSING_PRAISED} from "config/ports";
import Api, {createAction} from "utils/api";

const state = {
    journalList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    },
    passingDetail: {}
};
const mutations = {
    [JOURNAL_LIST](state, {payload}){
        state.journalList.items = payload;
    },
    [PASSING_DETAIL](state, {payload}){
        state.passingDetail = payload;
    },
    [PASSING_COLLECTION](state, {payload}){
        const isCollection = payload.isCollection ? 1 : 0;
        state.passingDetail.isCollection = isCollection;
    },
    [PASSING_PRAISED](state, {payload}){
        state.passingDetail.isPraised = payload.isPraised;
        state.passingDetail.praiseCount++;
    }
};

const actions = {
    getJournalList: createAction(JOURNAL_LIST, Api.getJournalList),
    getPasserbyDetail: createAction(PASSING_DETAIL, Api.getPasserbyDetail),
    passingCollection: createAction(PASSING_COLLECTION, Api.passingCollection),
    passingPraised: createAction(PASSING_PRAISED, Api.passingPraised),
}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}