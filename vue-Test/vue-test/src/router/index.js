import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/ShoppingMall'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Goods from '@/components/GOODS'
import CategoryList from '@/components/CategoryList'
import Car from '@/components/Car'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/main',name:'Main',component:Main,
      children:[
        {
          path: '/',
          name: 'ShoppingMall',
          component: ShoppingMall
        },
        {
          path:'/CategoryList',
          name:'CategoryList',
          component:CategoryList
        },
        {
          path:'/Car',
          name:'Car',
          component:Car,
        }
      ]
    },
    
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path:'/Goods',
      name:'Goods',
      component:Goods
    },
  ]
})
