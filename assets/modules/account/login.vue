<template lang="jade">
    div.account-content
        div.account-item
            el-input( placeholder="输入账号邮箱", v-model="email" )
                template(slot="prepend")
                    i.fa.fa-envelope
        div.account-item
            el-input( placeholder="输入密码", type="password" v-model="password" )
                template(slot="prepend")
                    i.fa.fa-lock
        a.account-submit(href="javascript:void(0);", @click="doLogin") 登录
        div.account-dec
            router-link(:to="{ path: 'register'}") 注册账号
            a(href="javascript:void(0);") 忘记密码
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Input, Message } from 'element-ui'

// 引入组件
Vue.use(Input)

export default {
    name: 'login',
    data () {
        return {
            email: '',
            password: ''
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
        ]),
        doLogin(){
            if(this.email === ''){
                return Message({ message: "邮箱不为空！", type: 'error', duration: 2000 });
            }
            if(!/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/.test(this.email)){
                return Message({ message: "邮箱格式错误了！", type: 'error', duration: 2000 });
            }
            //异步请求
        }
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
        .account-dec{
            @include clearfix;
            margin-top: 15px;
            a{
                &:link,&:visited,&:hover,&:active{
                    color: $main;
                    text-decoration: none;
                }  
                &:nth-child(1){
                    float: left;
                }    
                &:nth-child(2){
                    float: right;
                }    
            }

        }
    }
</style>