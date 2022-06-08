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
                        <!-- <div class="b_mod">
                            <b-button @click="$bvModal.show('modal-gif')" class="btn btn-primary mb-2">Gif</b-button>
                        </div> -->
                        
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
                            <input type="file" id="output" multiple @change="crearMetaData($event.target.files)" accept="image/*"  class="btn btn-primary mb-2">
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
                            <br/><img id="output" width="50"/>
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
            multimedia: [],
            listaAux: []
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
            // Subimos la publicacion
            axios.post(SERVER + '/feed/publicacion/', {
                id: "null",
                usuarioId: store.state.id,
                textoPlano: this.texto,
                fechaCreacion: fecha,
                esPublica: this.es_publica
            }).then(() => {
                //que significa esto en el archivo original
                //promesa, es lo que va a hacer esta madre cuando el sercidor responda
                router.push("/ui/feed")
            }).catch(error => {
                //los errores
                console.log(error.response.status);
                this.msj_error = error.response.data.Accion;
                console.log(error.response.data);
                this.$bvModal.show("error");
                this.titulo_error = error.response.data.Descripcion;
            });
            // Revisamos el id de la última publicación
            let id = store.state.id
            var pubId
            axios.get(SERVER + '/feed/publicacion?propietario_id=' + id)
            .then(response => {
                pubId = response.data[response.data.length-1].id;
                console.log(pubId);
                // Actualizamos la metadata de la multimedia
                console.log(pubId);
                for(let i = 0; i < this.multimedia.length; i++) {
                    let esVideoTmp = "false";
                    if(this.multimedia[i].type == "imagenes/*"){
                        esVideoTmp = "true";
                    }
                    this.lista.push({ 
                        multimediaId: "null",
                        publicacionId: pubId,
                        usuarioCreadorId: store.state.id,
                        multimedia: this.multimedia[i].name,
                        esVideo: esVideoTmp
                    });
                }
                // Subimos la metadata
                for(let i = 0; i < this.lista.length; i++) {
                    axios.post(SERVER + '/feed/multimedia/', this.lista[i])
                    .then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log(error.response.status);
                        this.msj_error = error.response.data.Accion;
                        console.log(error.response.data);
                        this.$bvModal.show("error");
                        this.titulo_error = error.response.data.Descripcion;
                    });
                }
            }).catch(error => { 
                //los errores
                router.push("/ui/publicacion")
                console.log(error.response.status);
                this.msj_error = error.response.data.Accion;
                console.log(error.response.data);
                this.$bvModal.show("error");
                this.titulo_error = error.response.data.Descripcion;
            });  
            // Subimos los archivos de la multimedia
            let formData = new FormData();
            for(let index = 0; index < this.multimedia.length; index++) {
                formData.append("files", this.multimedia[index]);
            }
            if (this.multimedia.length > 0) {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", SERVER+"/files/uploadMultipleFiles/");
                xhr.send(formData);
            }
        },
        toggle() {
            this.es_publica = !this.es_publica;
        },
        cerrar() {
            router.push("/ui/feed");
        },
        crearMetaData(fileList) {
            this.multimedia = fileList; 
            for (let i = 0; i < fileList.length; i++) {
                var output = document.getElementById('output');
                output.src = URL.createObjectURL(fileList[0]);
                output.onload = function() {
                    URL.revokeObjectURL(output.src) // free memory
                };
            }
        }
    }
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