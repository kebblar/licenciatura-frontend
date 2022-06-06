<template>
    <div>
        <NavBarInicio/> 
    <div>
        <div class=card-header>
            <h2>Noticias</h2>
        </div>
        <div class=comentar_padre>
            <button class="c_publicar" v-on:click="publicar">Crear publicación</button>
        </div>
    </div>
    <div class="align-items-center">
        <b-list-group>
            <b-list-group-item class="elemento" v-for="publicacion in publicaciones_obtenidas_f" :key="publicacion.fechaCreacion">
                <div class="card">
                    <div class="publicacion-fondo">
                        <div class="publicacion-fondo-hijo-1">
                            <img src="../assets/logo_atom.jpeg" alt="logo" width="60"/>
                        </div>
                        <div class="publicacion-fondo-hijo-1">
                            <h4> {{usuario}} </h4>
                            <h6>{{publicacion.fechaCreacion}} {{publicacion.esPublica}}</h6>
                        </div>
                    </div>
                    <div>
                        <h4>{{publicacion.textoPlano}}</h4>
                        
                        <div class=comentar_padre>
                            <button class="comentar" @click="togle2()">Mostrar imagenes</button>
                        </div>
                        <b-list-group v-show="mostrar_imagenes">
                            <b-list-group-item v-for="imagen in publicacion.urls" :key="imagen">
                                {{imagen}}
                                <img v-bind:src="require(imagen)" alt="">
                            </b-list-group-item>
                        </b-list-group>
                    </div>

                    <div>
                        <div class=comentar_padre>
                            <button class="comentar" @click="togle()">Comentar</button>
                        </div>
                        
                        <div v-if="comentar">
                            <div class=comentar_padre>
                                <b-form-textarea type="text" v-model="comentario"  size="lg" placeholder="Escribe un comentario"></b-form-textarea>
                                <button class="btn_publicar" v-on:click="publicar_comentario(publicacion.id,publicacion.usuarioId)">></button>
                            </div>
                            
                            <div class=comentario v-for="comentario in publicacion.comentarios" :key="comentario.fechaCreacion" >
                                <div>
                                    <h4> {{usuario}} </h4>
                                    <h6> {{comentario.fechaCreacion}} </h6>
                                </div>
                                <div>
                                    <h4>{{comentario.comentario}}</h4>
                                </div>
                            </div>
                            <!-- {{publicacion.multimedia[1]}} -->
                        </div>
                    </div>
                </div>
            </b-list-group-item>
        </b-list-group>
    </div>

    
    </div>
    
</template>

<script>
import router from '../router';
import axios from 'axios';
import SERVER from '../sites.js'
import store from '../store/index';
import NavBarInicio from './NavBarInicio.vue';
export default {
    name: 'Feed',
    data: function(){
        return {
            l_publicaciones: "",
            publicaciones_obtenidas: Object,
            publicaciones_obtenidas_f: Object,
            comentar: false,
            comentario: "",
            // l_comentarios: Object,
            lista_comentarios: Object,
            publicacion_actual: 0,
            usuario: "",
            l_p_c_comentarios_d: new Map(),
            urls: [],
            mostrar_imagenes: false
        }
    }, components:{
        'NavBarInicio':NavBarInicio
    },
    methods: {
        publicar() {
            router.push("/ui/publicacion")
        },
        getPublicaciones() {
            let id = store.state.id
            
            axios.get(SERVER + '/feed/publicacion?propietario_id=' + id
            ).then(response => {
                // tmp =response;
                console.log("CHIIIN")
                console.log(response);
                this.publicaciones_obtenidas = response.data;
                this.publicaciones_obtenidas_f = response.data.reverse();
                for(let i = 0; i < this.publicaciones_obtenidas_f.length; i++){
                    axios.get(SERVER + 'feed/comentario?publicacion_id='+this.publicaciones_obtenidas_f[i].id
                    ).then(respuesta => {
                        this.publicaciones_obtenidas_f[i].comentarios = respuesta.data;
                        this.publicaciones_obtenidas_f[i].c_desplegados = false;
                        this.publicaciones_obtenidas_f[i].urls = [];
                        this.l_p_c_comentarios_d.set(this.publicaciones_obtenidas_f[i].id,false);
                        console.log("AYUDAAAAAAAAA");
                        console.log(this.l_p_c_comentarios_d.get(this.publicaciones_obtenidas_f[i].id));
                        console.log(this.publicaciones_obtenidas_f[i]);
                    }).catch(error => {
                        console.log(error);
                    });
                    axios.get(SERVER + '/feed/multimedia/?multimedia_id='+this.publicaciones_obtenidas_f[i].id
                    ).then(res => {
                        // this.publicaciones_obtenidas_f[i].comentarios = respuesta.data;
                        // this.publicaciones_obtenidas_f[i].c_desplegados = false;
                        // this.l_p_c_comentarios_d.set(this.publicaciones_obtenidas_f[i].id,false);
                        // console.log("AYUDAAAAAAAAA");
                        // console.log(this.l_p_c_comentarios_d.get(this.publicaciones_obtenidas_f[i].id));
                        // console.log(this.publicaciones_obtenidas_f[i]);
                        console.log("PRUEBAAAA");
                        console.log(res);
                        let objetos_multimedia = res.data;
                        let l_multi_temp = [];
                        for(let j = 0; j < objetos_multimedia.length; j++){
                            
                            console.log("DENTRO DEL SEGUNDO FOR");
                            console.log(objetos_multimedia[j]);
                            axios.get(SERVER + '/files/archivos'
                            ).then(m_respuesta => {
                                console.log("AAAAAAAAAAAAAAAAAAAA 2");
                                console.log(m_respuesta.data);
                                let archivos = m_respuesta.data;
                                for(let k = 0; k < archivos.length; k++){
                                    if (archivos[k].nombre == objetos_multimedia[j].multimedia){
                                        this.urls.push(archivos[k].url);
                                        this.publicaciones_obtenidas_f[i].urls.push(archivos[k].ruta);
                                        console.log(i);
                                        console.log(this.publicaciones_obtenidas_f[i].urls);
                                    }
                                }
                                // let url = URL.createObjectURL(m_respuesta.data);
                                // l_multi_temp.push(url);
                                
                                // console.log("AAAA 2");
                                //console.log(this.publicaciones_obtenidas_f[i]);
                            
                            }).catch(error => {
                                console.log(error);
                            });
                        }
                        this.publicaciones_obtenidas_f[i].multimedia = l_multi_temp;
                    }).catch(error => {
                        console.log(error);
                    });
                }
                console.log("----------------->Los urls son:");
                console.log(this.urls);
            }).catch(error => {
                //los errores
                router.push("/ui/publicacion")
                console.log(error.response.status);
                this.msj_error = error.response.data.Accion;
                console.log(error.response.data);
                this.$bvModal.show("error");
                this.titulo_error = error.response.data.Descripcion;
            });
            axios.get(SERVER + 'usuario/detalle?usuarioId='+id
            ).then(response => {
                    console.log(response.data.nickName);
                    this.usuario=response.data.nickName;
                }).catch(error => {
                    console.log(error);
            });
            
        },
        publicar_comentario(publicacion_id,usuario_id) {
            var f = new Date();
            var mes = f.getMonth() + 1
            mes = mes + ''
            if(mes.length == 1){
                mes = '0' + mes
            }
            var dia = f.getDate()
            dia = dia + ''
            if(dia.length == 1){
                dia = '0' + dia
            }
            console.log(typeof parseInt(publicacion_id));
            console.log(typeof parseInt(publicacion_id));
            console.log(publicacion_id);
            var fecha = f.getFullYear() + "-" + mes + "-" + dia + " " + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
            axios.post(SERVER + '/feed/comentario', {
                comentarioId: "null",
                publicacionId: publicacion_id.toString(),
                usuarioCreadorId: usuario_id.toString(),
                comentario: this.comentario,
                fechaCreacion: fecha
            }).then(response => {
                console.log(response);
                console.log("El comentario fue agregado pasó");
                // router.push("/ui/feed");
                location.reload();
                router.go(0);
            }).catch(error => {
                console.log(error);
            });
        },
        togle() {
            // let i = this.publicaciones_obtenidas_f.length-id;
            //this.publicaciones_obtenidas_f[i].c_desplegados = !this.publicaciones_obtenidas_f[i].c_desplegados;
            // let anterior = this.l_p_c_comentarios_d.get(this.publicaciones_obtenidas_f[i].id);
            // this.l_p_c_comentarios_d.set(this.publicaciones_obtenidas_f[i].id,!anterior);
            
            this.comentar = !this.comentar;

            // this.$nextTick(function() {
            //     this.publicaciones_obtenidas_f[i].c_desplegados = !this.publicaciones_obtenidas_f[i].c_desplegados;
                
            // });
            // console.log("TOGGLE: ");
            // // this.publicacion_actual = id;
            // console.log("TOGLE ID:");
            // console.log(id);
            console.log(this.comentar);
            // //console.log(this.l_p_c_comentarios_d.get(this.publicaciones_obtenidas_f[i].id));
            // console.log(this.publicaciones_obtenidas_f[i].c_desplegados);
        },
        togle2() {
            this.mostrar_imagenes = !this.mostrar_imagenes;
        },
        recargar(){
            router.push("/ui/feed");
        },
        calcula(id){
            return this.l_p_c_comentarios_d.get(id);
        }
    },
    created: function () {
        window.addEventListener('pageshow', this.getPublicaciones);
        // window.addEventListener('click', this.obtener_comentarios(this.publicacion_actual));
    },

    // destroyed: function () {
    //     window.removeEventListener('pageshow', this.getPublicaciones);
    //     // window.addEventListener('click', this.obtener_comentarios(this.publicacion_actual));
    // }
}
</script>

<style scoped>
html, body {
    margin: 0;
    padding: 0;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #b3b3b3;
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
}

/* .card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  padding-bottom: 50px;
} */

img {
  border-radius: 5px 5px 0 0;
}
.elemento{
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn_publicar {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    background-color: rgb(87, 161, 226);
    border-radius: 100px;
    color: rgb(255, 255, 255);
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 1.3px;
    padding: 15px 15px;
}
.comentar_padre {
    background-color: #b3b3b3;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
}
.comentar {
    background-color: #727171;
    border: 1px solid rgb(0, 0, 0);
    width: 250px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
}
.c_publicar {
    background-color: #0044ff;
    border: 1px solid rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    font-family: 'Raleway', sans-serif;
    width: 600px;
    height: 40px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
}
.comentario {
    background-color: #727171;
    border-radius: 5px;
}
.container {
  padding: 2px 16px;
}
.publicacion-fondo{
    background-color:rgb(55, 81, 194);
    /* display: block; */
    height: 4em;
    
    /* position: relative;
    padding-bottom: 50px; */
}
.publicacion-fondo-hijo-1{
    /* display: block; */
    height: 4em;
    margin: 0;
    float: left;
}
/* .publicacion-fondo-hijo-2{
    display: block;
    height: 4em;
    margin: 0 auto;
} */
.input-file {
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
}
.b_mod {
    display: flex;
    justify-content: center;
}
.b_cerrar {
    position: relative;
    top: -55px; left: 650px;
    background-color: rgb(204, 0, 0);
    color: rgb(255, 255, 255);
}
.b_cerrar-1 {
    background-color: rgb(204, 0, 0);
    color: rgb(255, 255, 255);
}
.card-header-2{
    font-size: 15px;
}
.b_publicar{
    position: relative;
    bottom: 60px; left: 620px;
}
.b_multimedia{
    position: relative;
    bottom: 0px; right: 0px;
}
.e_privacidad{
    position: relative;
    top: 0px; left: 533px;
}
.btn-main {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 1.3px;
  padding: 0.2px 3px; /*medidas del boton*/
  text-decoration: none;
  text-transform: lowercase;
}

.btn-main:hover {
  background-color: rgb(6, 103, 250);
  color: black;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 1.3px;
  padding: 0.2px 3px;
  text-decoration: none;
  text-transform: lowercase;
}
.active{
    background-color: rgb(6, 103, 250);
    color: black;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 1.3px;
    padding: 0.2px 3px;
    text-decoration: none;
    text-transform: lowercase;
}
.my-card{
    width: 10vw;
    background-color: rgb(81, 113, 216);
}
  
section {
    width: 100%;
    height: 50vh;
    min-height: 50px;
    display: flex;
    background-color: rgb(255, 255, 255);
    align-items: center;
    justify-content: center;
    /* position: relative;
    padding-bottom: 50px; */
}
label{
    display: block;
}
input {
    width: 90%;
}
h2 {
    text-align: center;
}
button {
    margin-top: 2%;
    text-align: center;
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
        background-color:rgb(57, 141, 214);
    }
}

      
</style>