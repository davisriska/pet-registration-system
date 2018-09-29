<template>
    <div class="mb-2">
        <md-toolbar class="md-accent">

            <md-button class="md-icon-button" @click="showNavigation = true">
                <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">{{ this.$route.name}}</span>

            <div v-show="authorized" class="md-toolbar-section-end">
                <CreatePet></CreatePet>
            </div>

        </md-toolbar>

        <md-drawer :md-active.sync="showNavigation">
            <md-list v-if="authorized">
                <md-list-item :to="{name: 'Pets'}">
                    <md-icon>move_to_inbox</md-icon>
                    <span class="md-list-item-text">Pets</span>
                </md-list-item>
                <md-list-item :to="{name: 'Logout'}">
                    <md-icon>power_settings_new</md-icon>
                    <span class="md-list-item-text">Logout</span>
                </md-list-item>
            </md-list>
            <md-list v-else>
                <md-list-item :to="{name: 'Login'}">
                    <md-icon>exit_to_app</md-icon>
                    <span class="md-list-item-text">Login</span>
                </md-list-item>
                <md-list-item :to="{name: 'Register'}">
                    <md-icon>person_add</md-icon>
                    <span class="md-list-item-text">Register</span>
                </md-list-item>
            </md-list>
        </md-drawer>
    </div>
</template>

<script>
    import CreatePet from '../pets/CreatePet';

    export default {
        name: "Navbar",
        components: { CreatePet },
        data: () => ({
            showNavigation: false
        }),
        computed: {
            authorized() {
                return !!this.$store.state.token;
            }
        },
        watch: {
            $route(to, from) {
                this.showNavigation = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }
</style>