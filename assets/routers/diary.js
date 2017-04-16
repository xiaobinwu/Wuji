import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Index = resolve => require(['modules/diary/index.vue'], resolve)
const Edit = resolve => require(['modules/diary/edit.vue'], resolve)
const Detail = resolve => require(['modules/diary/detail.vue'], resolve)
const Category = resolve => require(['modules/diary/category.vue'], resolve)
const routes = [
  { path: '/', component: Index, name: 'index' },
  { path: '/create', component: Edit, name: 'create' },
  { path: '/edit', component: Edit, name: 'edit'},
  { path: '/detail', component: Detail, name: 'detail' },
  { path: '/category', component: Category, name: 'category' }
]

export default new VueRouter({
 	routes 
})