<template>
<div>
    <NavBarInicio/>
    <section>
        <Loading v-if="cargando"/>
        <div class="card my-card" v-if="!cargando">
            <div class=card-header>
                <h2>Recupera tu clave</h2>
            </div>
            <div class="card-body">
                <label>
                    Correo:
                    <input type="email" v-model="correo" class="form-control"/>
                </label>
                <button class="btn btn-primary mb-2" v-on:click="send_correo">Mandar correo</button>
                <hr>
                <div class="footer">
                    <router-link to="/registro">Registrarme</router-link>
                    <router-link to="/login">Inicia sesion</router-link>
                </div>
            </div>
        </div>
    </section>
    </div>
</template>
<script>
import axios from 'axios';
import router from '../router';
import NavBarInicio from './NavBarInicio.vue';
import Loading from './Loading.vue';
import SERVER from '../sites.js'
export default{
    name: 'RecuperarClave',
    data: function(){
        return {
            correo: '',
            cargando: false
        }
    },
    components:{
        'NavBarInicio':NavBarInicio,
        'Loading':Loading
    },
    methods:{
        send_correo(){
         this.cargando = true;
         console.log(this.correo);
         let config = {
            headers: {
                'charset': 'utf-8',
                'Content-Type': 'application/json'
            }
          }
          axios.post(SERVER + '/usuario/recupera-clave', this.correo, config).then(() => {
                router.push("/confirma-recuperar-clave")
            }).catch(() => {
                router.push("/confirma-recuperar-clave")
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