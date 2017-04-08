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
            a(href="javascript:void(0);", @click="showDialog") 忘记密码
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Input, Message } from 'element-ui'
import Validator from 'utils/validator'
// 引入组件
Vue.use(Input)

export default {
    name: 'login',
    data () {
        return {
            email: '',
            password: '',
            isShowDialog: false
        }
    },
    methods:{
        ...mapActions([
          'changeForgetPwdDialogStatus'
        ]),
        vaild(){
            let validator = new Validator();
            const errorMsg = validator.add(this.email, [
                {strategy: 'isNotEmpty', errorMsg:'邮箱不能为空！'},
                {strategy: 'emailFormat', errorMsg:'邮箱格式错误了！'}
            ]).add(this.password, [
                {strategy: 'isNotEmpty', errorMsg:'密码不为空！'}
            ]).start();
            validator = null;
            return errorMsg;
        },
        doLogin(){
            const errorMsg = this.vaild();
            if(errorMsg){
                return Message({ message: errorMsg, type: 'error', duration: 2000 });
            }
            //异步请求
        },
        showDialog(){
            this.changeForgetPwdDialogStatus({status:true});
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