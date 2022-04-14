import Vue from 'vue'
import VueRouter from 'vue-router'
import PantallaInicio from '../components/PantallaInicio.vue'
import Login from '../components/Login.vue'
import Registro from '../components/Registro.vue'
import AcercaDe from '../components/AcercaDe.vue'
import NotFound from '../components/NotFound.vue'
import RecuperarClave from '../components/RecuperarClave.vue'
import ConfirmaRecuperarClave from '../components/ConfirmaRecuperarClave.vue'
import Perfil from '../components/Perfil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PantallaInicio
  },
  {
    path: '/ui/login',
    name: 'login',
    component: Login
  },
  {
    path: '/ui/registro',
    name: 'registro',
    component: Registro
  },
  {
    path: '/ui/acerca-de',
    name: 'acerca-de',
    component: AcercaDe
  },
  {
    path: '/ui/recuperar-clave',
    name: 'recuperar-clave',
    component: RecuperarClave
  },
  {
    path: '/ui/confirma-recuperar-clave',
    name: 'confirma-recuperar-clave',
    component: ConfirmaRecuperarClave
  },
  {
    path: '/ui/perfil',
    name: 'perfil',
    component: Perfil
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
