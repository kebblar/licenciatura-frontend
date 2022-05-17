<template>
<div>
    <NavBarInicio/>
    <section>
        <div class="card my-card" >
            <div class=card-header>
                <h2>Ingresa el token que se envio a tu correo.</h2>
            </div>
            <div class="card-body">
                <div class="grid">
                    <label>
                        Token:
                        <input type="mail" v-model="token" class="form-control"/>
                    </label>
                </div>
                <button class="btn btn-primary mb-2" v-on:click="send_correo">Finalizar registro</button>
                <hr>
                <div class="footer">
                    <router-link to="/ui/registro">Registrarme</router-link>
                    <router-link to="/ui/login">Inicia sesion</router-link>
                </div>
            </div>
        </div>
        <b-modal id="error" :title="titulo_error">
            <p>{{msj_error}}</p>
        </b-modal>
    </section>
    </div>
</template>
<script>
import axios from 'axios';
import router from '../router';
import NavBarInicio from './NavBarInicio.vue';
import SERVER from '../sites.js';
import store from '../store/index';
export default{
    name: 'ConfrimaRegistro',
    data: function(){
        return {
            token: '',
            titulo_error: '',
            msj_error: '',
        }
    },
    components:{
        'NavBarInicio':NavBarInicio
    },
    methods:{
        send_correo(){
         let config = {
            headers: {
                'Charset': 'utf-8',
                'Content-Type': 'text/plain'
            }
          }
          axios.post(SERVER + '/usuario/confirma-registro', this.token, config).then(
              () => {
                this.msj_error = '';
                store.commit("set_msj", {msj_title:"Operacion exitosa", msj_body:"Se ha creado " +
                "tu cuenta, por favor inicia sesion."});
                router.push("/ui/login")
            }).catch((error) => {
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

      .grid{
          display: block;
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
