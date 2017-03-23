import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Index = resolve => require(['modules/passing/index.vue'], resolve)

const routes = [
  { path: '/', component: Index },

]

export default new VueRouter({
 	routes 
})