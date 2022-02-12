import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
let Public=()=>import('../views/Public')
let Mine=()=>import('../views/Mine')
let Design=()=>import('../views/Design')
let Search=()=>import('../views/Search')
let More=()=>import('../views/More')

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
