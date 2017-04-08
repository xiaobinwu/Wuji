<template lang="jade">

    el-dialog(title="忘记密码", v-model="isShowDialog", :close-on-click-modal="false", :close-on-press-escape="false", @close="closeDialog")
        el-steps( :active="step", :center="true", :align-center="true")
            el-step(title="输入邮箱")
            el-step(title="设置新密码")
            el-step(title="设置成功")
        div.step-container
            div.step(v-show="step===1")
                div.tip 输入注册登录的邮箱地址，并点击下一步，你的邮箱将收到验证码。
                el-input.input(v-model="yEmail", placeholder="请输入邮箱", auto-complete="on", :autofocus="true")
                    el-button(slot="append", type="danger", @click="doNext") 下一步
            div.step(v-show="step===2")
                el-input.input(v-model="code", placeholder="请输入验证码")
                el-input.input(v-model="pwd", placeholder="输入新密码")
                el-input.input(v-model="repwd", placeholder="请输确认密码")
                el-button.save-btn(type="primary", @click="doSave") 保存
                el-button.prev-btn(:plain="true", @click="prev") 上一步
                div.tip *收不到验证码请检查邮箱的垃圾箱哦～
            div.step(v-show="step===3")
                //- <img src="../../../public/images/dist/yes.svg" width="300" height="100"/>

</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Steps, Step, Dialog, Input, Button, Message} from 'element-ui'
import Validator from 'utils/validator'
// 引入组件
Vue.use(Dialog)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Input)
Vue.use(Button)
export default {
    name: 'forgetpwd',
    props: {
    },
    data () {
        return {
            step: 1,
            yEmail: '', //需要从cookie或是storeage中获取过去邮箱
            code: '',
            pwd: '',
            repwd: ''
        }
    },
    computed: {
        ...mapState({
            isShowDialog: state => state.account.isShowForgetPwdDialog
        })
    },
    methods:{
        ...mapActions([
          'changeForgetPwdDialogStatus'
        ]),
        closeDialog(){
            this.changeForgetPwdDialogStatus({status:false});
        },
        step1Valid(){
            let validator = new Validator();
            const errorMsg = validator.add(this.yEmail, [
                {strategy: 'isNotEmpty', errorMsg:'邮箱不能为空！'},
                {strategy: 'emailFormat', errorMsg:'邮箱格式错误了！'}
            ]).start();
            validator = null;
            return errorMsg;
        },
        doNext(){
            const errorMsg = this.step1Valid();
            if(errorMsg){
                return Message({ message: errorMsg, type: 'error', duration: 2000 });
            }
            //异步操作
            //...
            this.next();
        },
        step2Valid(){
            let validator = new Validator();
            const errorMsg = validator.add(this.code, [
                {strategy: 'isNotEmpty', errorMsg:'验证码不为空！'}
            ]).add(this.pwd, [
                {strategy: 'isNotEmpty', errorMsg:'新密码不为空！'}
            ]).add(this.repwd, [
                {strategy: 'isNotEmpty', errorMsg:'确认密码不为空！'},
                {strategy: 'confirmPwd:' + this.pwd, errorMsg:'前后密码要一致！'}
            ]).start();
            validator = null;
            return errorMsg;
        },
        doSave(){
            const errorMsg = this.step2Valid();
            if(errorMsg){
                return Message({ message: errorMsg, type: 'error', duration: 2000 });
            }
            //异步操作
            //...
            this.next();
        },
        next(){
            if (this.step++ > 2){
                this.step = 1;
                this.changeForgetPwdDialogStatus({status:false});
            }
        },
        prev(){
            this.step--;
        }
    },
    components: {
    }
}
</script>
<style lang="sass">
    @import "../../public/scss/_variables.scss";
    @import "../../public/scss/_mixins.scss";
    .el-dialog{
        min-width: 560px;
    }
    .step-container{
        .step{
            width: 70%;
            margin: auto;
            padding: 40px 0;
            .tip{
                margin: 10px 0 15px 0;
                line-height: 1.2;
                color: #333;
            }
            .save-btn,.prev-btn{
                width: 49.5%;
            }
            .prev-btn{
                margin-left: 1%;
            }
        }
        .input{
            margin-bottom: 20px;
            .el-input__inner{
                border: 1px solid #c0ccda;
                color: #666;
                &:focus{
                    border: 1px solid $main;
                }
            }
            .el-input-group__append{
                color: $white;
                background-color: $main;
                border-color: $main;
            }
        }
    }

</style>