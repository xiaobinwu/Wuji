<template lang="jade">
    div.main 这是个注册页面

</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Row, Col } from 'element-ui'
// 引入组件
Vue.use(Row)
Vue.use(Col)
export default {
    name: 'register',
    data () {
        return {
        }
    },
    beforeMount(){
        this.loadData();
    },
    mounted(){
        console.log(this.journalList)
    },
    computed: {
        ...mapState({
            journalList: state => state.example.journalList
        })
    },

    methods:{
        loadData(params = {}){
            this.getJournalList(params)
        },
        ...mapActions([
          'getJournalList'
        ])
    },
    components: {

    }
}
</script>
<style lang="sass">

</style>