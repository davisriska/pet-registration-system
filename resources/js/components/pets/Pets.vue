<template>
    <div class="col">
        <div class="row">
            <Pet v-for="pet in pets" v-bind:pet="pet"></Pet>
        </div>
    </div>
</template>

<script>

    import axios from '../../HTTP';
    import Pet from './Pet';

    export default {
        name: "PetsComponent",
        components: { Pet },
        data() {
            return {
                pets: []
            }
        },
        mounted() {
            this.getPets();
        },
        methods: {
            getPets() {
                axios.get('pets').then((response) => {
                    this.pets = response.data;
                }).catch((error) => {
                    if (error.response.status === 401) {
                        this.router('logout');
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>