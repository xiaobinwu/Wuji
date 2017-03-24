<template lang="jade">
div.wuji-container.center-block 
    el-row(:gutter="20",class="wuji-container-top")
        el-col(:span="16",class="")
            div
                div.wuji-top.wuji-left-top(v-lazy:background-image="'https://llp0574.github.io/img/iron.jpg'")
                div.wuji-bottom 不知道写些什么
        el-col(:span="8",class="") 
            div
                div.wuji-top
                    a(href="https://llp0574.github.io/img/logo.png") 
                        img(v-lazy="'https://llp0574.github.io/img/logo.png'")
                div.wuji-bottom 不知道写些什么dd
    el-row(class="wuji-container-item", v-for="item in journalList.items")
        el-col(:span="24")
            div.bg-img-container
                div.bg-img(v-lazy:background-image="item.userBGUrl")
            div.content
                p.content-p
                    span {{item.content}}
                    span    
                        a(href="javascript:void(0);") 继续阅读    
            div.dec
                div.pull-left.author
                    Avatar(:src="item.avatarUrl", width="44", height="44")
                    div
                        div.name {{item.nickName}}
                        div.time {{item.passbyDate | date}}
                div.pull-right
                    thumbs-up
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import { mapState, mapActions } from 'vuex'
import { Row, Col } from 'element-ui'
import thumbsUp from 'component/thumbsUp'
import Avatar from 'component/avatar'	
// 引入组件
Vue.use(Row)
Vue.use(Col)
Vue.use(VueLazyload,{
    loading: '/images/loading.gif'
})
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
            journalList: state => state.example.journalList
        })
    },
    filters: {
        'date': (value) =>{
            return Number(value.substr(4,2)) + '月' + Number(value.substr(6,2)) + ',' + value.substr(0,4);
        }
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
        Avatar
    }
}
</script>
<style lang="sass">
@import "../../public/scss/index.scss";
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
                        background-repeat: no-repeat;
                        background-position: top left;
                        background-size: cover;
                        &[lazy=loading]{
                            background-position: center center;
                            background-size: 200px 150px;
                        }
                    }
                    img{
                        width: 160px;
                        height: 160px;
                        margin-top: 88px;
                        &[lazy=loading]{
                            width: 200px;
                            height: 150px;
                        }
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
            .bg-img-container{
                height: 250px;
                border-radius: $border-radius;
                overflow: hidden;
                .bg-img{
                    height: 100%;
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    transition: transform .5s ease-out;
                    &[lazy=loading]{
                        background-position: center center;
                        background-size: 200px 150px;
                    }                    
                    &:hover{
                        transform: scale(1.1); 
                    }                
                }
            }
            .content{
                padding: 16px;
                height: 44px;
                line-height: 44px;
                border-bottom: 1px solid $gary-lightest;
                font-size: 0;
                .content-p > *{
                    font-size: 14px;
                    display: inline-block;
                }
                span{
                    max-width: 700px;
                    @extend %ellipsis;
                }
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
