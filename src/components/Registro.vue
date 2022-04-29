<template>
<div>
    <NavBarInicio/>
    <section>
        <Loading v-if="cargando"/>
        <div class="card my-card" v-if="!cargando">
            <div class=card-header>
                <h2>Registro</h2>
            </div>
            <div class="card-body">
                <div class="grid">
                    <label>
                        Correo:
                        <input type="email" v-model="correo" class="form-control"/>
                    </label>
                    <label>
                        Clave:
                        <input type="password" v-model="clave" class="form-control"/>
                        <small v-if="validacion" class="error">{{validacion}}</small>
                    </label>
                    <label>
                        Fecha nacimiento:
                        <input type="date" v-model="fecha_nac" class="form-control"/>
                    </label>
                    <label>
                        Nick:
                        <input type="text" v-model="nick" class="form-control"/>
                    </label>
                    <label>
                        Nombre:
                        <input type="text" v-model="nombre" class="form-control"/>
                    </label>
                    <label>
                        Apellido paterno:
                        <input type="text" v-model="apellido_paterno" class="form-control"/>
                    </label>
                    <label>
                        Apellido materno:
                        <input type="text" v-model="apellido_materno" class="form-control"/>
                    </label>
                    <label>
                        Telefono:
                        <input type="number" v-model="telefono" class="form-control"/>
                    </label>
                </div>
                
                <button class="btn btn-primary mb-2" v-on:click="send_correo">Mandar correo</button>
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
import Loading from './Loading.vue';
import SERVER from '../sites.js'
export default{
    name: 'Registro',
    data: function(){
        return {
            correo: '',
            cargando: false,
            clave:'',
            fecha_nac:'',
            nick:'',
            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            telefono: '',
            titulo_error: '',
            msj_error: '',
            validacion: ''


        }
    },
    components:{
        'NavBarInicio':NavBarInicio,
        'Loading':Loading
    },
    watch:{
        clave(){
            if(this.clave.length < 8 || this.clave.length > 16){
                this.validacion = "La clave debe de tener entre 8 y 16 caracteres, al menos una mayuscula, "+
                "al menos una minuscula, al menos un numero y al menos un caracter especial."
            }
            else if(this.clave.toUpperCase() == this.clave){
                this.validacion = "La clave debe de tener entre 8 y 16 caracteres, al menos una mayuscula, "+
                "al menos una minuscula, al menos un numero y al menos un caracter especial."
            }
            else if(this.clave.toLowerCase() == this.clave){
                this.validacion = "La clave debe de tener entre 8 y 16 caracteres, al menos una mayuscula, "+
                "al menos una minuscula, al menos un numero y al menos un caracter especial."
            }
            else if(!/\d/.test(this.clave)){
                this.validacion = "La clave debe de tener entre 8 y 16 caracteres, al menos una mayuscula, "+
                "al menos una minuscula, al menos un numero y al menos un caracter especial."
            }
            else if(!/[!@#$%&*()_+=|<>?{}\\[\]~-]/.test(this.clave)){
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
         this.cargando = true;
          axios.post(SERVER + '/usuario/preregistro', {
                "claveHash": this.clave,
                "correo": this.correo,
                "fechaNacimiento": this.fecha_nac,
                "id": 0,
                "instanteRegistro": 0,
                "nick": this.nick,
                "nombre": this.nombre,
                "primerApellido": this.apellido_paterno,
                "randomString": "",
                "segundoApellido": this.apellido_materno,
                "telefono": this.telefono
            }).then(() => {
                this.msj_error = '';
                router.push("/confirma-registro")
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
          min-height: 600px;
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
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
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

    .error{
        color:red;
        display: block;
        font-size: 10px;
    }

      @media (max-width: 1300px) {
          .my-card{
              width: 80vw;
          }
      }
</style>