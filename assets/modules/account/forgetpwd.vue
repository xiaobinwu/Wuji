<template lang="jade">

    el-dialog(title="忘记密码", v-model="isShowDialog", :close-on-click-modal="false", :close-on-press-escape="false", @close="closeDialog")
        el-steps( :active="1", finish-status="success", :center="true", :align-center="true")
            el-step(title="输入邮箱")
            el-step(title="设置新密码")
            el-step(title="设置成功")

</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Steps, Step, Dialog,  } from 'element-ui'

// 引入组件
Vue.use(Dialog)
Vue.use(Steps)
Vue.use(Step)

export default {
    name: 'forgetpwd',
    props: {
    },
    data () {
        return {
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
        }
    },
    components: {
    }
}
</script>
<style lang="sass">
    @import "../../public/scss/_variables.scss";
    @import "../../public/scss/_mixins.scss";

</style>