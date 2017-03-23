/*
* 过客列表
* 不要使用render直接渲染，不然做不了热加载
*/
import Vue from 'vue'
import index from './index.vue'
import store from "stores/index"


const app = new Vue({
	store,	
	...index
})

app.$mount('#wrap')
