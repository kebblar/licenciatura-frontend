import Vue from 'vue'
import VueRouter from 'vue-router'
import PantallaInicio from '../components/PantallaInicio.vue'
import Login from '../components/Login.vue'
import Registro from '../components/Registro.vue'
import AcercaDe from '../components/AcercaDe.vue'
import RecuperarClave from '../components/RecuperarClave.vue'
import ConfirmaRecuperarClave from '../components/ConfirmaRecuperarClave.vue'
import Perfil from '../components/Perfil.vue'
import ConfirmaRegistro from '../components/ConfirmaRegistro.vue'
import NotFound from '../components/NotFound.vue'
import Publicacion from '../components/Publicacion.vue'
import Feed from '../components/Feed.vue'
import store from '../store'
import axios from 'axios';

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
    path: '/ui/confirma-registro',
    name: 'confirma-registro',
    component: ConfirmaRegistro
  },
  {
    path: '/ui/perfil',
    name: 'perfil',
    component: Perfil,
    meta: { allowedRoles: ['USUARIO'] }
  },
  {
    path: '/ui/publicacion',
    name: 'publicacion',
    component: Publicacion
  },
  {
    path: '/ui/feed',
    name: 'feed',
    component: Feed
  },
  {
    path: '/*',
    name: 'NotFound',
    component: NotFound
  }, 
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

function checaJwt() {
  var jwt = store.state.jwt;
  if (jwt && jwt !== undefined && jwt.length > 0) {
    
      const jwtPayload = parseJwt(jwt);
      const limite = (Date.now() / 1000)-(2*60);
      if (jwtPayload.exp < limite) {
        store.commit('set_jwt', '');
      }
  }
}

router.beforeEach((to, _from, next) => {

  axios.defaults.headers.common = {"X-CSRFToken": store.state.jwt};
  axios.defaults.headers.common = {"jwt": store.state.jwt};
  checaJwt();


  if (to.matched.some(record => record.meta.allowedRoles )) { 
    // NO estás autenticado actualmente:
    if (store.state.jwt==='') {
      store.commit("set_msj",{"msj_title":"Sesion expirada", "msj_body":"Por favor vuelve a iniciar sesion"})
      router.push("/ui/login");
      return;
    }
  }
  next(); // *** El recurso NO requiere autenticación
})

export default router
