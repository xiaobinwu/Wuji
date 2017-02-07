<template lang="jade">
    div.main
        Aside(route="passing")
        div.wuji-container.center-block 
            el-row(:gutter="20",class="wuji-container-top")
                el-col(:span="16",class="")
                    div
                        div.wuji-top.wuji-left-top
                        div.wuji-bottom 不知道写些什么
                el-col(:span="8",class="") 
                    div
                        div.wuji-top
                            a(href="https://llp0574.github.io/img/logo.png") 
                                img(src="https://llp0574.github.io/img/logo.png")
                        div.wuji-bottom 不知道写些什么dd
            el-row(class="wuji-container-item", v-for="n in 5")
                el-col(:span="24")
                    div.bg-img
                    div.content
                        p 
                            span 自定义的一套Git使用规范，感谢超哥，沿用至今。     
                            a(href="javascript:void(0);") 继续阅读    
                    div.dec
                        div.pull-left.author
                            Avatar(src="https://llp0574.github.io/img/avatar.png", width="44", height="44")
                            div
                                div.name llp
                                div.time 10月 14, 2015
                        div.pull-right
                            thumbs-up
        Footer

</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Row, Col } from 'element-ui'
import thumbsUp from '../../../component/thumbsUp'
import Aside from '../../../component/aside'
import Footer from '../../../component/footer'
import Avatar from '../../../component/avatar'
// 引入组件
Vue.use(Row)
Vue.use(Col)
export default {
    name: 'passingindex',
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
            journalList: 'journalList'
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
        thumbsUp,
        Footer,
        Aside,
        Avatar
    }
}
</script>
<style lang="sass">
@import "../../../public/scss/index.scss";
$prefix: 'wuji';
$border-radius: 5px;
.#{$prefix}-container{
    width: $container-width;
    padding-top: 165px;
    .#{$prefix}-container-top{
        .el-col{
            & > div{
                background-color: $white;   
                border-radius: $border-radius;
                & > .#{$prefix}-top{
                    height: 336px;
                    text-align: center;
                    &.#{$prefix}-left-top{
                        border-top-left-radius: $border-radius;
                        border-top-right-radius: $border-radius;
                        background: url("https://llp0574.github.io/img/iron.jpg") no-repeat top left;
                        background-size: cover;
                    }
                    img{
                        width: 160px;
                        height: 160px;
                        margin-top: 88px;
                    }
                }
                & > .#{$prefix}-bottom{
                    height: 64px;
                    line-height: 64px;
                    text-align: center;
                }                               
            }          
        }
    }
    .#{$prefix}-container-item{
        margin: 45px 0;
        margin-bottom: 45px;
        background-color: $white;
        .el-col{
            height: 400px;
            .bg-img{
                height: 250px;
                border-radius: $border-radius;
                background: url("https://llp0574.github.io/img/vue.png") no-repeat top left;
                background-size: cover;                
            }
            .content{
                padding: 16px;
                height: 44px;
                line-height: 44px;
                border-bottom: 1px solid $gary-lightest;
            }
            .dec{
                @include clearfix;
                .author{
                    height: 73px;
                    display: table;
                    & > div{
                        vertical-align: middle;
                        display: table-cell;
                        padding-left: 20px;
                    }
                }
            }
        }
    }
}
</style>