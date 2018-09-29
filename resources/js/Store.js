import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import { mapState } from 'vuex';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
    key: 'pet-registration-system',
    storage: localStorage
});

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        token: localStorage.getItem('token')
    },
    computed: {
        ...mapState([
            'token'
        ])
    },
    mutations: {
        login(state, token) {
            state.token = token;
        },
        logout(state) {
            state.token = null;
        }
    }
})