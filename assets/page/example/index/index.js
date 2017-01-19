/*
* example
*/

import Vue from 'vue'
import index from './index.vue'

const app = new Vue({
  render: h => h(index)
})

app.$mount('#wrap')
