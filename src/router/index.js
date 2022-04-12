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
import ConfirmaRegistro from '../components/ConfirmaRegistro.vue'

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
    path: '/recuperar-clave',
    name: 'recuperar-clave',
    component: RecuperarClave
  },
  {
    path: '/confirma-recuperar-clave',
    name: 'confirma-recuperar-clave',
    component: ConfirmaRecuperarClave
  },
  {
    path: '/confirma-registro',
    name: 'confirma-registro',
    component: ConfirmaRegistro
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: Perfil
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
