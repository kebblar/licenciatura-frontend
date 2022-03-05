<template>
  <div id="app">
    <Pantalla-inicio/>
  </div>
</template>

<script>

import PantallaInicio from './components/PantallaInicio';
export default {
  name: 'App',
    components: {
      'PantallaInicio': PantallaInicio,
    },
  data (){
    return {
      nombre: ""
    }
  }, 

}
</script>
