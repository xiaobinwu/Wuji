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
        a.account-submit(href="javascript:void(0);", @click="doRegister") 注册
        p.agreement-tip 注册即代表您同意吾记的<a href="javascript:void(0);">用户条款</a>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Input, Message} from 'element-ui'

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
        ]),
        doRegister(){
            if(this.email === ''){
                return Message({ message: "邮箱不为空！", type: 'error', duration: 2000 });
            }
            if(!/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/.test(this.email)){
                return Message({ message: "邮箱格式错误了！", type: 'error', duration: 2000 });
            }    
            if(this.password === ''){
                return Message({ message: "密码不为空！", type: 'error', duration: 2000 });
            }    
            if(this.password !== this.repassword){
                return Message({ message: "前后密码不一致！", type: 'error', duration: 2000 });
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
        .agreement-tip{
            margin-top: 20px;
            font-size: 13px;
            color: #999;
            text-align: center;
        }
    }
</style>