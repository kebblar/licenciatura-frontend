<template>
        <div class = "main">
            <div class="text">
                <h1>Lo sentimos...</h1>
                <h2>No pudimos encontrar esa página</h2>
                <h3>Da click aquí para regresar a <router-link to="/">Inicio</router-link></h3>
            </div>
            <div class="image">
                <img src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260">
            </div>
        </div>
</template>

<style scoped>
.main {
    width: 500px;
    height: 100%;
    
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    
    margin: auto;
}

.text h1{
    font-size: 80px;
    color: dimgrey;
    margin-bottom: 0%;

}

.text h2{
    margin-top: 0;
    font-size: 30px;
    color:darkgrey;
    margin-bottom: 0%;
}

.text h3{
    color:dimgrey;
    margin-top: 0;
}

a {
    text-decoration: none;
}

.image img{
    background-size: cover;
    border-radius: 50%;
    height: 300px;
    width: 300px;
    margin-left: 10%;
}
</style>