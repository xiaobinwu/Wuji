<template lang="jade">
  div.container
    p {{message}}
    div
      p.text 这是一个测试用例
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="text">文字按钮</el-button>  
    div.block
        span.demonstration 默认
        <el-slider v-model="value1"></el-slider>

    div.block
        span.demonstration 默认不区分颜色
        <el-rate v-model="value1"></el-rate>


</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Button, Slider, Rate } from 'element-ui'
import '../../_main.scss'
// 引入组件
Vue.use(Button)
Vue.use(Slider)
Vue.use(Rate)
export default {
    name: 'example',
    data () {
        return {
          message: 'Welcome to Your Vue.js App',
          value1: 0
        }
    },
    beforeMount(){
        this.loadData()
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
    }
}
</script>
<style lang="sass">
.container{
    width: 100%;
    height: 100%;
    p{
        color: red;
        font-size: 14px;
        box-sizing: border-box;
    }
    .text{
        transform: translateY(-10px);
    } 
}
.block{
    margin-top: 150px;
}
.demonstration{
    color: red;
    font-size: 15px;
}
</style>