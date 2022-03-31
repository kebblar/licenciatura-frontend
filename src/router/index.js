import Vue from 'vue'
import VueRouter from 'vue-router'
import PantallaInicio from '../components/PantallaInicio.vue'
import Login from '../components/Login.vue'
import Registro from '../components/Registro.vue'
import AcercaDe from '../components/AcercaDe.vue'
import NotFound from '../components/NotFound.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PantallaInicio
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registro',
    name: 'registro',
    component: Registro
  },
  {
    path: '/acerca-de',
    name: 'acerca-de',
    component: AcercaDe
  },
  {
    path: '/*',
    name: '404',
    component: NotFound
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
