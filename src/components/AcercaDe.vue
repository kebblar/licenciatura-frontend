<template>
    <div>
        <NavBarInicio/> 
        <h1>ACERCA DE</h1>
        <h2>Proyecto de Ingeniería de Software 2022-2</h2>
        <h3>Desarrollado por:</h3>
        <ul>
            <li>Arroyo Lozano Santiago</li>
            <li>García Méndez Gerardo Damián</li>
            <li>Liera Montaño Miguel Ángel</li>
            <li>Noyola Nazario Alejandro</li>
        </ul>
    </div>
</template>
<script>
    import NavBarInicio from './NavBarInicio.vue';
    export default {
        name: 'AcercaDe',
        components:{
            'NavBarInicio':NavBarInicio
        }
    }
</script>
