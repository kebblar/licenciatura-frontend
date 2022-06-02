<template>
<div>
    <NavBarInicio/>
    <section>
        <div class="card my-card" >
            <div class=card-header>
                <h2>Inicia sesion</h2>
            </div>
            <div class="card-body">
                <label>
                    Correo:
                    <input type="email" v-model="correo" class="form-control"/>
                </label>
                <label>
                    Clave:
                    <input type="password" class="form-control" v-model="clave"/>
                </label>
                
                <button class="btn btn-primary mb-2" v-on:click="login">Iniciar sesion</button>
                <hr>
                <div class="footer">
                    <router-link to="/ui/registro">Registrarme</router-link>
                    <router-link to="/ui/recuperar-clave">Olvide mi clave</router-link>
                </div>
            </div>
        </div>
        <b-modal id="error" :title="titulo_error">
            <p>{{msj_error}}</p>
        </b-modal>
        <b-modal id="aviso" :title="titulo_aviso" @hidden="borrarMensaje">
            <p>{{body_aviso}}</p>
        </b-modal>
    </section>
    </div>
</template>
<script>
import axios from 'axios';
import store from '../store/index';
import router from '../router';
import NavBarInicio from './NavBarInicio.vue';
import SERVER from '../sites.js'
export default{
    name: 'Login',
    data: function(){
        return {
            correo: '',
            clave: '',
            msj_error: '',
            titulo_error: '',
            titulo_aviso: '',
            body_aviso: ''
        }
    },
    components:{
        'NavBarInicio':NavBarInicio
    },
    mounted(){
        if (store.state.msj_body){
          this.titulo_aviso = store.state.msj_title
          this.body_aviso = store.state.msj_body
          this.$bvModal.show("aviso");
      }
    },
    methods:{
        borrarMensaje(){
            store.commit("set_msj", {msj_title:"", msj_body:""});
        },
        login(){
          axios.post(SERVER + '/usuario/login/', {
                mail: this.correo,
                clave: this.clave,
          }).then(response => {
                store.commit("set_jwt", response.data.jwt);//setea el valor del jwt segun lo que nos respondió el servidor
                store.commit("set_id", response.data.id);
                console.log(store.state.jwt);
                this.msj_error = '';
                router.push("/ui/feed")//aqui cambiar a noticias
            }).catch(error => {
                console.log(error.response.status);
                this.msj_error = error.response.data.Accion;
                console.log(error.response.data);
                this.$bvModal.show("error");
                this.titulo_error = error.response.data.Descripcion;
           });

        }
    },
}
</script>

<style scoped>
  html, body {
    margin: 0;
    padding: 0;
  }
  
      .my-card{
          width: 40vw;
      }
  
      section {
          width: 100%;
          height: 92vh;
          min-height: 400px;
          display: flex;
          background-color: gainsboro;
          align-items: center;
          justify-content: center;
      }
      label{
          display: block;
      }
      input {
          width: 100%;
      }
      h2 {
          text-align: center;
      }
      button {
          margin-top: 2%;
      }
      .footer {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
  
      }
      .footer a{
          margin-right: 4%;
          flex: 120px;
          text-align: center;
          text-decoration: none;
      }
      @media (max-width: 1300px) {
          .my-card{
              width: 80vw;
          }
      }
</style>