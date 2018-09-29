<template>
    <div class="page-container md-layout-column md-layout-row">
        <navbar/>
        <md-content>
            <router-view></router-view>
        </md-content>
    </div>
</template>

<script>
    import Navbar from './partials/Navbar';
    import CreatePet from './pets/CreatePet';
    import Pets from './pets/Pets';

    export default {
        name: "App",
        components: { Pets, Navbar, CreatePet }
    }
</script>

<style lang="scss" scoped>
    .md-app {
        min-height: 350px;
    }
</style>