<template>
    <div>
        <!-- <h3 v-for="movie in movies" :key="movie._id">{{ movie.name }}</h3> -->
        <h3 v-for="quote in quotes" :key="quote._id">{{ quote.dialog }}</h3>
    </div>
</template>

<script>
import lotrService from '../services/LotrService';

export default{
    data(){
        return {
            quotes: []
        }
    },
    created() {
        lotrService.getQuotes()
            .then ((response) => {
                console.log(response);
                this.quotes = response.data.docs;
            })
    }
}
</script>