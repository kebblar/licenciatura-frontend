<template>
    <header>
        <ul>
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/ui/login">Iniciar sesion</router-link></li>
            <li><router-link to="/ui/registro">Registrarse</router-link></li>
            <li><router-link to="/ui/feed">Feed</router-link></li>
            <li style="float:right"><router-link to="/ui/acerca-de">Acerca de</router-link></li>
        </ul>
    </header>
</template>

<script>

export default {
    title:"NavBarInicio"
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
            height: 60px;
        }

        header li {
            float: left;
            border-right:1px solid #bbb;
            height: 100%;
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
            height: 100%;
        }

        header li a:hover:not(.active) {
            background-color: #111;
        }

        header .active {
            background-color: #8c8f8e;
        }

        /* header {
            position: fixed;
            top: 0; 
            width: 100%; 
        } */
</style>