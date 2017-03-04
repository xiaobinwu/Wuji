/*
* 注册页面
*/
import Vue from 'vue'
import register from './register.vue'
import store from "../../../stores/example"


const app = new Vue({
	store,	
	...register
})

app.$mount('#wrap')
