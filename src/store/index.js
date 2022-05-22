import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

const store = new Vuex.Store({
  state: {
    jwt: "",
    id: "",
    msj_title: "",
    msj_body: "",
  },
  mutations: {
    set_jwt (state, jwt) {
      state.jwt = jwt;
    },
    set_id (state, id) {
      state.id = id;
    },
    set_msj(state, mensaje){
      state.msj_title = mensaje.msj_title
      state.msj_body = mensaje.msj_body
    }
  },
  plugins: [vuexLocalStorage.plugin]
})
export default store;