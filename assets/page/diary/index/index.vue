<template lang="jade">
    div.main
        Aside(route="journals")
        div.wuji-container.center-block 
            div.wuji-operating
                div.wuji-category
                    ul
                        li(v-for="n in 10")
                            span(style="background-color: #5dac81")
                            span 分类{{n}}
                div.wuji-add
                    i.fa.fa-pencil-square-o
                    span 添加日记
            time-line(width="450")
        Footer
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Row, Col } from 'element-ui'
import Aside from '../../../component/aside'
import Footer from '../../../component/footer'
import timeLine from '../../../component/timeline'
// 引入组件
Vue.use(Row)
Vue.use(Col)
export default {
    name: 'diaryindex',
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
        Footer,
        Aside,
        timeLine
    }
}
</script>
<style lang="sass">
@import "../../../public/scss/index.scss";
$prefix: 'wuji';
.#{$prefix}-container{
    width: $container-width;
    .#{$prefix}-operating{
        @include clearfix;
        padding: 80px 0 40px 0;
        .#{$prefix}-category{
            float: left;
            width: $container-width - 200px;
            ul{
                li{
                    float: left;
                    margin: 0 30px 15px 0;
                    span:nth-child(1){
                        margin-right: 5px;
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        border-radius: $circle-radius;
                    }
                }
            }
        }
        .#{$prefix}-add{
            float: right;
            color: $main;
            i{
                margin-right: 3px;
            }
        }
    }
}
</style>