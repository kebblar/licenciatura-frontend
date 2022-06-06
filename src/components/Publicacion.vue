<template>
    <div>
    <section>
        <div class="card my-card" >
            <div class=card-header>
                <h2>Crear publicación</h2>
                <button class="b_cerrar" size="sm" variant="outline-danger" @click="cerrar">Cerrar</button>
            </div>
            <div class="e_privacidad">
                <button
                    class="btn-main"
                    @click="toggle"
                    :class="[b_publica,
                    es_publica ? 'active' : '']"
                >Publica</button>
                <button
                    class="btn-main"
                    @click="toggle"
                    :class="[b_publica,
                    !es_publica ? 'active' : '']"
                >Privada</button>
            </div>
            <div class="card-body">
                <label>
                    <b-row md="4">
                        <b-col md="120">
                            <b-form-textarea type="text" v-model="texto" rows="3" size="lg" placeholder="¿Qué estás pensando...?"></b-form-textarea>
                        </b-col>
                    </b-row>
                </label>
                <div>
                    <b-button class="b_multimedia" @click="$bvModal.show('modal-multimedia')">Agregar contenido multimedia</b-button>

                    <b-modal id="modal-multimedia" centered hide-footer>
                         <template #modal-header>
                            <!-- Emulate built in modal header close button action -->
                                <b-button size="sm" class="b_cerrar-1" @click="$bvModal.hide('modal-multimedia')">
                                    Cerrar
                                </b-button>
                            <h5>Agregar contenido Multimedia</h5>
                        </template>
                        <div class="b_mod">
                            <b-button @click="$bvModal.show('modal-imagen')" class="btn btn-primary mb-2">Imagenes</b-button>
                        </div>
                        <div class="b_mod">
                            <b-button @click="$bvModal.show('modal-video')" class="btn btn-primary mb-2">Video</b-button>
                        </div>
                        <div class="b_mod">
                            <b-button @click="$bvModal.show('modal-gif')" class="btn btn-primary mb-2">Gif</b-button>
                        </div>
                        
                    </b-modal>
                    <b-modal id="modal-imagen" centered title="Selecciona el tipo de fuente de tu contenido multimedia" hide-footer>
                        <template #modal-header>
                            <!-- Emulate built in modal header close button action -->
                                <b-button size="sm" class="b_cerrar-1" @click="$bvModal.hide('modal-imagen')">
                                    Cerrar
                                </b-button>
                            <h5>Agregar contenido Multimedia</h5>
                        </template>
                        <div class="b_mod">
                            <!-- <b-button>Subir desde el ordenador</b-button> -->
                            <input type="file" id="selector-imagenes" multiple @change="crearMetaData($event.target.files)" accept="image/*"  class="btn btn-primary mb-2">
                        </div>
                        <div class="b_mod">
                            <b-button @click="aux">Elegir del perfil</b-button>
                        </div>
                    </b-modal>
                    <b-modal id="modal-video" centered title="Selecciona el tipo de fuente de tu contenido multimedia" hide-footer>
                        <template #modal-header>
                            <!-- Emulate built in modal header close button action -->
                                <b-button size="sm" class="b_cerrar-1" @click="$bvModal.hide('modal-video')">
                                    Cerrar
                                </b-button>
                            <h5>Agregar contenido Multimedia</h5>
                        </template>
                        <div class="b_mod">
                            <input type="file" id="selector-videos" multiple @change="crearMetaData($event.target.files)" accept="video/*"  class="btn btn-primary mb-2">
                        </div>
                        <div class="b_mod">
                            <b-button>Elegir del perfil</b-button>
                        </div>
                    </b-modal>
                    <b-modal id="modal-gif" centered title="Selecciona el tipo de fuente de tu contenido multimedia" hide-footer>
                        <template #modal-header>
                            <!-- Emulate built in modal header close button action -->
                                <b-button size="sm" class="b_cerrar-1" @click="$bvModal.hide('modal-gif')"> <!--variant="outline-danger" -->
                                    Cerrar
                                </b-button>
                            <h5>Agregar contenido Multimedia</h5>
                        </template>
                        <div class="b_mod">
                            <input type="file" id="selector-imagenes" multiple @change="crearMetaData($event.target.files)" accept="image/*"  class="btn btn-primary mb-2">
                        </div>
                        <div class="b_mod">
                            <b-button>Elegir del perfil</b-button>
                        </div>
                    </b-modal>
                </div>
                <div>
                    <label class="b_publicar">
                        <button class="btn btn-primary mb-2" v-on:click="publicar">Publicar</button>
                    </label>
                    
                    
                </div>
            </div>
        </div>
        
        <!-- <b-modal id="error" :title="titulo_error">
            <p>{{msj_error}}</p>
        </b-modal>
        <b-modal id="aviso" :title="titulo_aviso" @hidden="borrarMensaje">
            <p>{{body_aviso}}</p>
        </b-modal> -->
    </section>
    <!--eetiqueta input, file en html y eso mandarlo al scripy hacer un evento, una interaccion entre el navegador. @change, le paso una funcion que 
    //se ejecute cuando el usuario suba el archivo from data, objeto de js-->
    </div>
</template>

<script>
import axios from 'axios';
import SERVER from '../sites.js'
import store from '../store/index';
import router from '../router';
export default {
    name: 'Publicacion',
    components: {

    },
    data: function(){
        return {
            texto: "",
            es_publica: true,
            c_multimedia: "",
            b_publica: '',
            dialog_multimedia: false,
            lista: [],
            multimedias: []
        }
        //que son los componentres, ps los otros componentes que tengo en la carpeta components
    },
    methods: {
        aux(){
            console.log("no jala");
            const selectorImg = document.getElementById('selector-imagenes');
            selectorImg.addEventListener('change', (event) => {
                const fileList = event.target.files;
                console.log(fileList);
            });
        },
        publicar(){
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
            var fecha = f.getFullYear() + "-" + mes + "-" + dia + " " + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
        axios.post(SERVER + '/feed/publicacion/', {
            id: "null",
            usuarioId: store.state.id,
            textoPlano: this.texto,
            fechaCreacion: fecha,
            esPublica: this.es_publica
        }).then(response => {
            //que significa esto en el archivo original
            //promesa, es lo que va a hacer esta madre cuando el sercidor responda
            store.commit("set_jwt", response.data.jwt);//setea el valor del jwt segun lo que nos respondió el servidor
            console.log(store.state.jwt);
            router.push("/ui/feed")
        }).catch(error => {
            //los errores
            router.push("/ui/publicacion")
            console.log(error.response.status);
            this.msj_error = error.response.data.Accion;
            console.log(error.response.data);
            this.$bvModal.show("error");
            this.titulo_error = error.response.data.Descripcion;
        });
        // var fileList = document.getElementById('selector-imagenes');

        // var files = fileList.files
        // console.log("CHINGA TU MADRE")
        // console.log(files)
        // axios.put(SERVER, formData, 
        // { headers: 
        //         {'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        //         }}).then(response => {
        //         console.log(response);
        //     }).catch(error => {
        //         console.log(error.response.status);
        //         console.log(error.response.data);
        //    });
        
        // axios.post(SERVER + '/feed/multimedia/', {
        //         multimediaId: "null",
        //         publicacionId: 1,//id de la publicacion 
        //         usuarioCreadorId: store.state.id,
        //         multimedia: '',
        //         esVideo: "false" //+ nombre.img
        //   },files
        // console.log("Si se muestra");
        // console.log(this.multimedias);
        // console.log(this.multimedias[0]);
        // console.log(this.multimedias[1]);
        // if(this.muldimedias.length != 0){
        console.log("No funciono 1");
        console.log(this.lista.lenght);
        for(let i = 0; i < this.lista.length; i++){
            console.log("No funciono");
            console.log(this.lista[i]);
            axios.post(SERVER + 'feed/multimedia/', this.lista[i]
            ).then(response => {
                    store.commit("set_jwt", response.data.jwt);
                    console.log(store.state.jwt);
                }).catch(error => {
                    console.log(error.response.status);
                    this.msj_error = error.response.data.Accion;
                    console.log(error.response.data);
                    this.$bvModal.show("error");
                    this.titulo_error = error.response.data.Descripcion;
            });
            console.log(this.multimedias[i]);
            axios.put(SERVER + 'feed/multimedia/', {
                // id: ,
                multimedia: this.multimedias[i]
            }
            ).then(response => {
                    store.commit("set_jwt", response.data.jwt);
                    console.log(store.state.jwt);
                }).catch(error => {
                    console.log(error.response.status);
                    this.msj_error = error.response.data.Accion;
                    console.log(error.response.data);
                    this.$bvModal.show("error");
                    this.titulo_error = error.response.data.Descripcion;
            });
        }
        // axios.post(SERVER + '/feed/multimedia/', {
        //     lista: this.lista,
        //     multimedias: this.multimedias
        //     }
        // ).then(response => {
        //         store.commit("set_jwt", response.data.jwt);
        //         console.log(store.state.jwt);
        //     }).catch(error => {
        //         console.log(error.response.status);
        //         this.msj_error = error.response.data.Accion;
        //         console.log(error.response.data);
        //         this.$bvModal.show("error");
        //         this.titulo_error = error.response.data.Descripcion;
        // });
        // }
        
        },
        toggle() {
            this.es_publica = !this.es_publica;
        },
        cerrar() {
            router.push("/ui/feed");
        },
        crearMetaData(fileList){
            // console.log(fileList.length);
            for (let i = 0; i < fileList.length; i++) {
                // console.log("CHANGOS")
                // console.log(fileList[i].name);
                var esVideoTmp = "false";
                if(fileList[i].type == "imagenes/*"){
                    esVideoTmp = "true";
                }
                this.lista.push({
                    multimediaId: "null",
                    publicacionId: 1,//id de la publicacion 
                    usuarioCreadorId: store.state.id,
                    multimedia: fileList[i].name,
                    esVideo: esVideoTmp //+ nombre.img
                });
            }
            // this.multimedias = fileList;
            for (let i = 0; i < fileList.length; i++) {
                const formData = new FormData();
                formData.append("file", fileList[i], fileList[i].name);
                this.multimedias.push(formData);
            }
            console.log(this.lista)
            for (let i = 0; i < fileList.length; i++) {
                console.log(this.lista[i]);
            }
        }
        // c_multimedia(){
            
        // }
    }
    //cuadno guardemos imagenes es ap.destination, pedimos como /nombre.imagen
}
//como correr la aplicacion npm run serve desde terminal
//un componente por cada ventana? no
//componentes: publicacion, agregar mulrimedia(foto, video o multimedia), la fuente(como acceder a archivos de la computadora), cuando ya seleccionemos
//la imagen, la mandamos al componente publicacion? no, unosolamente dos, publ y noticias
//crear un ultimo componente que sea el feed? con crear publicaciones si
</script>

<style scoped>
  html, body {
    margin: 0;
    padding: 0;
  }
  .input-file {
    /* opacity: 0; invisible but it's there! */
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