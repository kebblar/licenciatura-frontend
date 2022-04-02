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
                    <router-link to="/registro">Registrarme</router-link>
                    <router-link to="/recuperar-clave">Olvide mi clave</router-link>
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
export default{
    name: 'Login',
    data: function(){
        return {
            correo: '',
            clave: '',
            msj_error: '',
            titulo_error: ''
        }
    },
    components:{
        'NavBarInicio':NavBarInicio
    },
    methods:{
        login(){
          axios.post('http://localhost:8080/usuario/login/', {
                mail: this.correo,
                clave: this.clave,
          }).then(response => {
                store.commit("set_jwt", response.data.jwt);
                console.log(store.state.jwt);
                this.msj_error = '';
                router.push("/")
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
</style>