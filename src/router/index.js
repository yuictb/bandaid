import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
let Public=()=>import('../views/Public')
let Mine=()=>import('../views/Mine')
let Design=()=>import('../views/Design')
let Search=()=>import('../views/Search')
let More=()=>import('../views/More')
let Tfyss=()=>import('../views/Tfyss')

const routes = [
  {
    path: '/',
    component: Public,
    children:[
      {
        path:'',
        component:Home
      },
      {
        path:'design',
        component:Design,
      },
      {
        path:'mine',
        component:Mine
      }
    ],
  },
  {
    path:'/search',
    component:Search
  },
  {
    path:'/more/:id',
    component:More
  },
  {
    path:'/tfyss/:id/:n',
    component:Tfyss
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
