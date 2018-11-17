<template>
    <div class="col-3">
        <md-card class="md-white">
            <md-card-media>
                <img :src="pet.image" alt="Image">
            </md-card-media>

            <md-card-header>
                <div class="md-title">{{ pet.name}}</div>
                <div class="md-subhead">{{ pet.category.value}}</div>
                <div class="md-subhead">{{ pet.address.value}}</div>
            </md-card-header>

            <md-card-actions md-alignment="right">
                <EditPet :pet="pet"></EditPet>
                <md-button class="md-icon-button" @click="deletePet">
                    <md-icon>delete</md-icon>
                </md-button>
            </md-card-actions>

        </md-card>
    </div>
</template>

<script>

    import EditPet from '../pets/EditPet';

    export default {
        name: "Pet",
        props: ['pet'],
        components: { EditPet },
        methods: {
            deletePet() {
                this.reloadPets();
            },
            reloadPets() {
                this.$parent.getPets();
            }
        }
    }
</script>

<style scoped>

</style>