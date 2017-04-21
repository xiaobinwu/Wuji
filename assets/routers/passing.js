import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Index = resolve => require(['modules/passing/index.vue'], resolve)
const Detail = resolve => require(['modules/passing/detail.vue'], resolve)

const routes = [
  { path: '/', component: Index, name: 'index' },
  { path: '/detail', component: Detail, name: 'detail' },
]

export default new VueRouter({
 	routes 
})