import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Resume from '../views/Resume.vue'
import PlacesIveBeen from '../views/Places-Ive-Been.vue'
import Music from '../views/Music.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume
  },
  {
    path: '/places-ive-been',
    name: 'Places I\'ve Been',
    component: PlacesIveBeen
  },
  {
    path: '/music',
    name: 'Music',
    component: Music
  }, 
]

const router = new VueRouter({
  routes
})

export default router
