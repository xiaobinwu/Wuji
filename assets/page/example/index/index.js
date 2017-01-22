/*
* example
*/

import Vue from 'vue'
import index from './index.vue'
import store from "../../../stores/example"


const app = new Vue({
	store,	
	render: h => h(index)
})

app.$mount('#wrap')
