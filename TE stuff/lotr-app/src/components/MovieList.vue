<template>
    <div>
        <h3 v-for="movie in movies" :key="movie._id">{{ movie.name }}</h3>
    </div>
</template>

<script>
import lotrService from '../services/LotrService';

export default{
    data(){
        return {
            movies: []
        }
    },
    created() {
        lotrService.getMovies()
            .then ((response) => {
                console.log(response);
                this.movies = response.data.docs;
            })
    }
}
</script>