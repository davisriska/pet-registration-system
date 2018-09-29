<template>
    <div class="col">
        <div class="row" v-for="pet in pets" >
            <div class="col">
                {{ pet.name }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PetsComponent",
        data() {
            return {
                pets: [
                    {
                        id: 1,
                        name: 'Crazy dog'
                    },
                    {
                        id: 2,
                        name: 'Crazy cat'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>