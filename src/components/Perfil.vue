<template>
    <h1>Mi perfil</h1>
</template>

<script>
import store from '../store/index';
import router from '../router';
export default {
    title:"Perfil",
    created() {
      if (!store.state.jwt) {
        router.push("/")
      }
  },
}
</script>
