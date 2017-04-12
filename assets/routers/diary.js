import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Index = resolve => require(['modules/diary/index.vue'], resolve)
const Edit = resolve => require(['modules/diary/edit.vue'], resolve)
const Detail = resolve => require(['modules/diary/detail.vue'], resolve)
const routes = [
  { path: '/', component: Index },
  { path: '/create', component: Edit },
  { path: '/edit', component: Edit },
  { path: '/detail', component: Detail }
]

export default new VueRouter({
 	routes 
})