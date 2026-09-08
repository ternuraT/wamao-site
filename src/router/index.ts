import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ChenggongView from '@/views/ChenggongView.vue'
import DaliView from '@/views/DaliView.vue'
import LijiangView from '@/views/LijiangView.vue'
import DiyWorkshopView from '@/views/DiyWorkshopView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/chenggong', name: 'chenggong', component: ChenggongView },
  { path: '/dali', name: 'dali', component: DaliView },
  { path: '/lijiang', name: 'lijiang', component: LijiangView },
  { path: '/diy', name: 'diy', component: DiyWorkshopView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
