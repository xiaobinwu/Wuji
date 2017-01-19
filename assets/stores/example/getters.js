export default {
    filterJournalList: state => {
      return state.journalList.filter(todo => todo.done)
    }
}
