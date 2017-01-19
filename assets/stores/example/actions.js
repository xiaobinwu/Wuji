import {JOURNAL_LIST} from "../../config/ports";
import Api, {createAction} from "../../utils/api";

// const metaCreator = ({processIds}) =>({jobsIds: processIds.split(',')});

export default {
    getJournalList: createAction(JOURNAL_LIST, Api.getJournalList)
}
