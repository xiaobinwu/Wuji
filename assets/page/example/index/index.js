/*
* example
*/

import Vue from 'vue'
import store from "../../../stores/example";
import index from './index.vue'

const app = new Vue({
	store,	
	render: h => h(index)
})

app.$mount('#wrap')
