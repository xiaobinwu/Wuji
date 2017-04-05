<template lang="jade">
    div.account-content
        div.account-item
            el-input( placeholder="输入常用邮箱", v-model="email" )
                template(slot="prepend")
                    i.fa.fa-envelope
        div.account-item
            el-input( placeholder="请输入昵称", type="nickname" v-model="nickname" )
                template(slot="prepend")
                    i.fa.fa-user
        div.account-item
            el-input( placeholder="输入登录密码", type="password" v-model="password" )
                template(slot="prepend")
                    i.fa.fa-lock
        div.account-item
            el-input( placeholder="再次输入登录密码", type="password" v-model="repassword" )
                template(slot="prepend")
                    i.fa.fa-lock

        a.account-submit(href="javascript:void(0);") 注册
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Input } from 'element-ui'

// 引入组件
Vue.use(Input)

export default {
    name: 'register',
    data () {
        return {
            email: '',
            nickname: '',
            password: '',
            repassword: ''
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
    @import "../../public/scss/_variables.scss";
    @import "../../public/scss/_mixins.scss";
    .account-content{
        .account-item{
            margin-bottom: 25px;
        }
        .fa-lock{
            width: 14px;
            text-align: center;
        }
    }
</style>