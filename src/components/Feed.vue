<template>
    <div>
    <section>
        <div class="card my-card" >
            <div class=card-header>
                <h2>Noticias</h2>
            </div>
            <div class="card-body">
                <button class="btn btn-primary mb-2" v-on:click="publicar">Crear publicación</button>
            </div>
        </div>
    </section>
    </div>
</template>

<script>
import router from '../router';
export default {
    name: 'Feed',
    data: function(){
        return {
        }
    },
    methods: {
        publicar() {
            router.push("/ui/publicacion")
        }
    }
}
</script>
