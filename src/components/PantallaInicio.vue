<template>
    <div>
<header>
        <ul>
  <li><a class="active" href="#home">Inicio</a></li>
  <li><a href="#news">Iniciar sesion</a></li>
  <li><a href="#contact">Registrarse</a></li>
  <li style="float:right"><a href="#about">Acerca de</a></li>
</ul>
    </header>

        <main>
        <div class="jumbotron">
            <div class="container">
            <h1>     Conecta con las personas</h1>
            <a href="#" class="btn-main"> Registrarme </a>
            </div>
        </div>
        </main>

        <section class="info">
            <div class="half-col" style="padding-left: 10%;padding-right: 5%;">
                <div class="jumbotron-mini"></div>
            </div>
            <div class="half-col">
                <div class="t-info">
                  <br>                
                    <h1>Conoce la nueva red social de nueva generacion</h1>
                    <p>Nuestra red social, segura, transparente, gratis y 100% mexicana
                        es la forma de conectar con tus amigos y familia que buscas.
                    </p>
                    <ul>
                        <li>Publica lo que quieras como quieras</li>
                        <li>Conecta con tus amigos y familia</li>
                        <li>100% gratis 100% mexicana</li>
                    </ul>
                </div>
            </div>
        


        </section>


        <section class="info2">

            <div class="half-col" >
                <div class="t-info" style="padding-right: 10%;margin-right:35%">
                  <br>                
                    <h1>Proyecto de la materia Ingenieria de software</h1>
                    <p>Este proyecto fue desarrollado por estudiantes de la materia
                      de Ingenieria de software de la UNAM.
                    </p>
                </div>
            </div>
            <div class="half-col" style="padding-left: 10%;padding-right: 5%;">
                <div class="jumbotron-mini"></div>
            </div>
        


        </section>
        
        

        <section class="supporting">

        <div class="container">

            <div class="col">
            <img src="https://s3.amazonaws.com/codecademy-content/projects/broadway/design.svg">
            <h2>Sin censura</h2><br>
            <p>Di lo que quieras decir de la manera en que quieras.</p><br>
            <a href="#!" v-on:click="sinCensura()"> Más info</a><br>
            </div>

            <div class="col">
            <img src="https://s3.amazonaws.com/codecademy-content/projects/broadway/design.svg">
            <h2>Sin terminos confusos</h2>
            <p>Nuestros terminos de uso estan explicados de forma que los entiendas.</p>
            <a href="#!" v-on:click="sinConfusion()"> Más info</a><br>
            </div>

            <div class="col">
            <img src="https://s3.amazonaws.com/codecademy-content/projects/broadway/develop.svg">
            <h2>Gratis</h2><br>
            <p>Lo es hoy y lo será por siempre</p><br><br>
            <a href="#!" v-on:click="gratis()"> Más info</a><br>
            </div>

            <div class="col">
            <img src="https://s3.amazonaws.com/codecademy-content/projects/broadway/deploy.svg">
            <h2>Transparentes</h2><br>
            <p>Nunca utilizaremos tus datos sin tu permiso</p><br>
            <a href="#!" v-on:click="transparentes()"> Más info</a><br>
            </div>

        </div>

        </section>

        <font-awesome-icon icon="fa-regular fa-circle-question" />

        <footer>
        <div class="container">
            <p>&copy; Ingenieria de software UNAM 2022-1</p>
        </div>
        </footer>
        <div>
        


          <b-modal ok-only id="modalInfos" :title="titulo">
            <p class="my-4">{{contenido}}</p>
          </b-modal>
        </div>



      
  </div>

</template>

<script>

export default {
    name: 'PantallaInicio',
    data: function () {
      return {
          username: "",
          password: "",
          titulo: "",
          contenido: ""
      }
  },
    methods:{
      transparentes: function(){
        this.titulo = "Transparentes";
        this.contenido = `Lorem ipsum dolor sit amet, 
                          consectetur adipiscing elit. Integer iaculis consectetur mauris, 
                          vel auctor nisi pellentesque a. Mauris porta ex sit amet mollis imperdiet. 
                          Integer non orci dapibus, luctus nunc non, mollis massa.`;
        this.$bvModal.show('modalInfos')
      },
      sinCensura: function(){
        this.titulo = "Sin Censura";
        this.contenido = `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit. Integer iaculis consectetur mauris, 
                  vel auctor nisi pellentesque a. Mauris porta ex sit amet mollis imperdiet. 
                  Integer non orci dapibus, luctus nunc non, mollis massa.`;
        this.$bvModal.show('modalInfos')
      },
      gratis: function(){
        this.titulo = "Gratis";
        this.contenido = `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit. Integer iaculis consectetur mauris, 
                  vel auctor nisi pellentesque a. Mauris porta ex sit amet mollis imperdiet. 
                  Integer non orci dapibus, luctus nunc non, mollis massa.`;
        this.$bvModal.show('modalInfos')
      },
      sinConfusion: function(){
        this.titulo = "Sin confusion";
        this.contenido = `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit. Integer iaculis consectetur mauris, 
                  vel auctor nisi pellentesque a. Mauris porta ex sit amet mollis imperdiet. 
                  Integer non orci dapibus, luctus nunc non, mollis massa.`;
        this.$bvModal.show('modalInfos')
      }
    }
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
}

header ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

header li {
  float: left;
  border-right:1px solid #bbb;
}

header li:last-child {
  border-right: none;
}

header li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

header li a:hover:not(.active) {
  background-color: #111;
}

header .active {
  background-color: #8c8f8e;
}



main {
  position:relative;
  text-align: center;
}

main h1 {
  color: #333;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 70px;
  margin-top: 0px;
  padding-top: 20%;
  margin-bottom: 80px;
  text-transform: uppercase;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 30px 0;
}

footer p {
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  font-size: 11px;
}

.container {
  max-width: 940px;
  margin: 0 auto;
  padding: 0 10px;
  text-align: center;
}

.jumbotron {
  height: 800px;
  background-image: url("https://images.pexels.com/photos/1095826/pexels-photo-1095826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.btn-main {
  background-color: #333;
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 1.3px;
  padding: 16px 40px;
  text-decoration: none;
  text-transform: uppercase;
}

.btn-main:hover {
  background-color: white;
  color: black;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 1.3px;
  padding: 16px 40px;
  text-decoration: none;
  text-transform: uppercase;
}

.btn-default {
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 1.3px;
  padding: 10px 20px;
  text-decoration: none;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.supporting {
  padding-top: 80px;
  padding-bottom: 100px;
  margin-top: 40%;
}

.supporting .col {
  font-family: 'Raleway', sans-serif;
  text-align: center;
  width:200px;
    height:200px;
    display:inline-block;
}

.supporting img {
  height: 32px;
}

.supporting h2 {
  font-weight: 600;
  font-size: 23px;
  text-transform: uppercase;
}

.supporting p {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  padding: 0 20px;
  margin-bottom: 20px;
}

.supporting a {
  background-color: white;
  color: #333333;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 1.3px;
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #333333;
}

.supporting a:hover {
  background-color: black;
  color: white;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 1.3px;
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid white;
}

.info {
    margin-top: 5%;
}

.info .half-col{
    width:50%;

    height:200px;
    display:inline-block;
}

.info .half-col .jumbotron-mini{
    height: 800px;
    background-image: url("https://images.pexels.com/photos/1245055/pexels-photo-1245055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    background-size: cover;
    border-radius: 5%;
}

.info .half-col .t-info{
    font-family: 'Raleway', sans-serif;
    text-align: center;
    padding-top: 10%;
    position: absolute;
}

.t-info p{
  color: darkgray;
}

.t-info li{
  color: darkgray;
}

.info .half-col h1{
    font-size: 40px;
}

.info .half-col p{
    font-size: 30px;
}

.info .half-col li{
    font-size: 20px;
}


.info2 {
    margin-top: 5%;
    padding-top: 40%;
}

.info2 .half-col{
    width:50%;

    height:200px;
    display:inline-block;
}

.info2 .half-col .jumbotron-mini{
    height: 800px;
    background-image: url("https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    background-size: cover;
    border-radius: 5%;
}

.info2 .half-col .t-info{
    font-family: 'Raleway', sans-serif;
    text-align: center;
    padding-top: 10%;
    position: absolute;
    padding-left: 5%;
}

.t-info2 p{
  color: darkgray;
}

.t-info2 li{
  color: darkgray;
}

.info2 .half-col h1{
    font-size: 40px;
}

.info2 .half-col p{
    font-size: 30px;
}

.info2 .half-col li{
    font-size: 20px;
}


@media (max-width: 500px) {
  main h1 {
    font-size: 50px;
    padding: 0 40px;
  }

  .supporting .col {
    width: 100%;
  }
}

@media (max-width: 1300px) {
  main h1 {
    font-size: 50px;
    padding: 0 40px;
  }

  .supporting {
    width: 100%;
    margin-top: 60%;
  }
}

@media (max-width: 850px) {
  main h1 {
    font-size: 50px;
    padding: 0 40px;
  }

  .supporting {
    width: 100%;
    margin-top: 80%;
  }

  .info2 {
    margin-top: 35%;
  }

}

@media (max-width: 650px) {
  main h1 {
    font-size: 50px;
    padding: 0 40px;
  }

  .supporting {
    width: 100%;
    margin-top: 90%;
  }

  .info2 {
    margin-top: 90%;
  }

  .info2 .half-col h1{
    font-size: 25px;
  }

  .info2 .half-col p{
      font-size: 20px;
  }

  .info2 .half-col li{
      font-size: 15px;
  }

  .info2 .half-col .jumbotron-mini{
    height: 600px;
    background-size: cover;
    border-radius: 5%;
  }

  .info .half-col h1{
    font-size: 25px;
  }

  .info .half-col p{
      font-size: 20px;
  }

  .info .half-col li{
      font-size: 15px;
  }

  .info .half-col .jumbotron-mini{
    height: 600px;
    background-size: cover;
    border-radius: 5%;
  }

}
</style>