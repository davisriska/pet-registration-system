/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import nprogress from 'nprogress';

import Vue from 'vue';

import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';

Vue.use(VueRouter);
Vue.use(VueMaterial);

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/login', component: Login, name: 'Login',
            meta: {
                guest: true
            }
        },
        {
            path: '/register', component: Register, name: 'Register',
            meta: {
                guest: true
            }
        },
        {
            path: '/pets', component: Pets, name: 'Pets',
            meta: {
                auth: true
            }
        },
        {
            path: '/pets/:id', component: Pets, name: 'Pet',
            meta: {
                auth: true
            }
        },
        {
            path: '/logout', name: 'Logout',
            beforeEnter: () => {
                store.commit('logout');
                router.push('Login');
            }
        },
        { path: '/', redirect: { name: 'Pets' } }
    ]
});

router.beforeResolve((to, from, next) => {
    if (to.name) {
        nprogress.start();
    }
    next();
});

router.afterEach((to, from) => {
    nprogress.done();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (store.state.token) {
            next();
        } else {
            next({ name: 'Login', params: { nextUrl: to.fullPath } });
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.state.token) {
            next({ name: 'Pets' });
        } else {
            next();
        }
    } else {
        next();
    }
});

import store from './Store';

import App from './components/App';

import Login from './components/Login';
import Register from './components/Register';
import Pets from './components/pets/Pets';

const app = new Vue({
    router,
    store,
    template: '<App/>',
    components: { App },

}).$mount('#app');
