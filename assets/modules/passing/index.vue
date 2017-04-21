<template lang="jade">
div.wuji-container.center-block 
    el-row(:gutter="20",class="wuji-container-top")
        el-col(:span="16",class="")
            div
                div.wuji-top.wuji-left-top
                    Calendar.wuji-calendar(@click-callback="calendarCellClick")
        el-col(:span="8",class="") 
            div
                div.wuji-top
                    a(href="https://llp0574.github.io/img/logo.png") 
                        img(v-lazy="'https://llp0574.github.io/img/logo.png'")
    el-row(class="wuji-container-item", v-for="item in journalList.items")
        el-col(:span="24")
            div.bg-img-container
                div.bg-img(v-lazy:background-image="item.userBGUrl")
            div.content
                p.content-p
                    span {{item.content}}
                    span
                        router-link(:to = "{ path: 'detail', query: { id: 'Iqeu8U+/HhvO4cPKwCAM8ECqoiIb6IDSKC9tiDzZk8LpccfAPn9zLpKzYFesEJiY' } }") 继续阅读
            div.dec
                div.pull-left.author
                    Avatar(:src="item.avatarUrl", width="44", height="44")
                    div
                        div.name {{item.nickName}}
                        div.time {{item.passbyDate | date}}
                div.pull-right
                    thumbs-up(:number="item.praiseCount")
    Pagination(:total="50", :num="5", :type="1")
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import { mapState, mapActions } from 'vuex'
import { Row, Col, MessageBox } from 'element-ui'
import thumbsUp from 'component/thumbsUp'
import Avatar from 'component/avatar'
import Calendar from 'component/calendar'
import Pagination from 'component/pagination'
// 引入组件
Vue.use(Row)
Vue.use(Col)
Vue.use(VueLazyload,{
    loading: '../../../public/images/dist/loading.gif'
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
        date(value){
            return Number(value.substr(4,2)) + '月' + Number(value.substr(6,2)) + ',' + value.substr(0,4);
        }
    },
    methods:{
        calendarCellClick(cell, datedata){
            MessageBox.confirm('今天没有写日记哦，快来补上~~', '( >﹏<。)～呜呜呜……', {
                confirmButtonText: '写日记',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                alert('你点击的是'+ datedata.solarYear + '年' + datedata.solarMonth + '月' + datedata.solarDate + '日'); 
            }).catch(() => {
                alert('取消');    
            });            
        },
        loadData(params = {}){
            this.getJournalList(params)
        },
        ...mapActions([
          'getJournalList'
        ])
    },
    components: {
        thumbsUp,
        Avatar,
        Calendar,
        Pagination
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
                    height: 376px;
                    text-align: center;
                    &.#{$prefix}-left-top{
                        .#{$prefix}-calendar{
                            margin: auto;
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
