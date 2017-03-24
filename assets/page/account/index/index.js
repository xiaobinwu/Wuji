/*
* 用户模块
* 不要使用render直接渲染，不然做不了热加载
*/
import Vue from 'vue'
import index from './index.vue'
import store from "stores/index"
import router from "routers/account"

const app = new Vue({
	store,
	router,
	...index
})

app.$mount('#wrap')
