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
import Validator from 'utils/validator'
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
    methods:{
        vaild(){
            let validator = new Validator();
            const errorMsg = validator.add(this.email, [
                {strategy: 'isNotEmpty', errorMsg:'邮箱不能为空！'},
                {strategy: 'emailFormat', errorMsg:'邮箱格式错误了！'}
            ]).add(this.nickname, [
                {strategy: 'isNotEmpty', errorMsg:'昵称不能为空！'},
            ]).add(this.password, [
                {strategy: 'isNotEmpty', errorMsg:'密码不为空！'}
            ]).add(this.repassword, [
                {strategy: 'isNotEmpty', errorMsg:'确认密码不为空！'},
                {strategy: 'confirmPwd:' + this.password, errorMsg:'前后密码要一致！'}
            ]).start();
            validator = null;
            return errorMsg;
        },
        doRegister(){
            const errorMsg = this.vaild();
            if(errorMsg){
                return Message({ message: errorMsg, type: 'error', duration: 2000 });
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