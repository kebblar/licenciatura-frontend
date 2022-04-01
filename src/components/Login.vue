<template>
    <section>
        <div class="card">
            <div class=card-header>
                <h2>Inicia sesion para continuar</h2>
            </div>
            <div class="card-body">
                <label>
                    Correo:
                    <input type="text" v-model="correo"/>
                </label>
                <label>
                    Clave:
                    <input type="password" v-model="clave"/>
                </label>
                <button v-on:click="login">Iniciar sesion</button>
                <hr>
                <div class="footer">
                    <router-link to="/">Regresar a inicio</router-link>
                    <router-link to="/recuperar-clave">Olvide mi clave</router-link>
                </div>
            </div>
        </div>
        <b-modal id="error" :title="titulo_error">
            <p>{{msj_error}}</p>
        </b-modal>
    </section>
</template>
<script>
import axios from 'axios';
import store from '../store/index';
import router from '../router';
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
    section {
        width: 100%;
        height: 500px;
        display: flex;
        background-color: black;
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
    .error{
        color: red;
        font-style: arial;
    }
</style>