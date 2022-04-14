<template>
<div>
    <NavBarInicio/>
    <section>
        <div class="card my-card" >
            <div class=card-header>
                <h2>Ingresa el token que se envio a tu correo</h2>
            </div>
            <div class="card-body">
                <label>
                    Token:
                    <input type="text" v-model="token" class="form-control"/>
                </label>
                <label>
                    Clave:
                    <input type="password" class="form-control" v-model="clave"/>
                </label>
                <small class="error">{{validacion}}</small>
                <button class="btn btn-primary mb-2" v-on:click="send_correo">Cambiar clave</button>
                <hr>
                <div class="footer">
                    <router-link to="/registro">Registrarme</router-link>
                    <router-link to="/login">Inicia sesion</router-link>
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
import store from '../store/index';
import router from '../router';
import NavBarInicio from './NavBarInicio.vue';
import SERVER from '../sites.js';
export default{
    name: 'ConfirmaRecuperarClave',
    data: function(){
        return {
            token: '',
            clave: '',
            titulo_error: '',
            msj_error: '',
            validacion: ''
        }
    },
    components:{
        'NavBarInicio':NavBarInicio
    },
    watch:{
        clave(){
            if(this.clave.length < 8 || this.clave.length > 16){
                console.log("longitud")
                this.validacion = "La clave debe de tener entre 8 y 16 caracteres, al menos una mayuscula, "+
                "al menos una minuscula, al menos un numero y al menos un caracter especial."
            }
            else if(this.clave.toUpperCase() == this.clave){
                console.log("mayusucla")
                this.validacion = "La clave debe de tener entre 8 y 16 caracteres, al menos una mayuscula, "+
                "al menos una minuscula, al menos un numero y al menos un caracter especial."
            }
            else if(this.clave.toLowerCase() == this.clave){
                console.log("minusculas")
                this.validacion = "La clave debe de tener entre 8 y 16 caracteres, al menos una mayuscula, "+
                "al menos una minuscula, al menos un numero y al menos un caracter especial."
            }
            else if(!/\d/.test(this.clave)){
                console.log("numeros")
                this.validacion = "La clave debe de tener entre 8 y 16 caracteres, al menos una mayuscula, "+
                "al menos una minuscula, al menos un numero y al menos un caracter especial."
            }
            else if(!/[!@#$%&*()_+=|<>?{}\\[\]~-]/.test(this.clave)){
                console.log("caracteres especiales")
                this.validacion = "La clave debe de tener entre 8 y 16 caracteres, al menos una mayuscula, "+
                "al menos una minuscula, al menos un numero y al menos un caracter especial."
            }
            else{
                this.validacion = ""
            }
        }
    },
    methods:{
        send_correo(){
          console.log(this.correo);
          axios.post(SERVER + '/usuario/confirma-token', {
                claveNueva: this.clave,
                token: this.token
          }).then(() => {
                this.msj_error = '';
                store.commit("set_msj", {msj_title:"Operacion exitosa", msj_body:"Se cambio satisfactoriamente tu clave"});
                router.push("/ui/login")
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

    .error{
        color:red;
        display: block;
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