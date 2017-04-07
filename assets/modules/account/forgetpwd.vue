<template lang="jade">

    el-dialog(title="忘记密码", v-model="isShowDialog", :close-on-click-modal="false", :close-on-press-escape="false", @close="closeDialog")
        el-steps( :active="step", :center="true", :align-center="true")
            el-step(title="输入邮箱")
            el-step(title="设置新密码")
            el-step(title="设置成功")
        div.step-container
            div.step(v-show="step===0")
                div.tip 输入注册登录的邮箱地址，并点击下一步，你的邮箱将收到验证码。
                el-input.email(v-model="yEmail", placeholder="请输入邮箱", auto-complete="on", :autofocus="true")
                    el-button(slot="append", type="danger", @click="doNext") 下一步
            div.step(v-show="step===1")
                p 第二步
            div.step(v-show="step===2")
                p 第三步
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Steps, Step, Dialog, Input, Button, Message} from 'element-ui'

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
            step: 0,
            yEmail: '' //需要从cookie或是storeage中获取过去邮箱
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
        doNext(){
            if(!/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/.test(this.yEmail)){
                return Message({ message: "邮箱格式错误了！", type: 'error', duration: 2000 });
            }
        },
        next(){
            if (this.step++ > 2){
                this.step = 0;
                this.changeForgetPwdDialogStatus({status:false});
            }
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
        }
        .email{
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