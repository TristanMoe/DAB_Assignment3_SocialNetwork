import './css/site.css';
import 'bootstrap';
import Vue from 'vue';
import VueRouter from 'vue-router';
import AppStore from './store';
Vue.use(VueRouter);

const routes = [
    { path: '/', component: require('./components/home/home.vue.html') },
    { path: '/counter', component: require('./components/counter/counter.vue.html') },
    { path: '/fetchdata', component: require('./components/fetchdata/fetchdata.vue.html') },
    { path: '/follow-user', component: require('./components/follow-user/follow-user.vue.html') },
    { path: '/Account', component: require('./components/Account/Account.vue.html') },
    { path: '/wall', component: require('./components/userwall/wall.vue.html') },
    { path: '/block-user', component: require('./components/block-user/block-user.vue.html') },
    { path: '/sign-up', component: require('./components/sign-up/sign-up.vue.html') },
    { path: '/CreatePost', component: require('./components/CreatePost/CreatePost.vue.html') }
];

new Vue({
    el: '#app-root',
    store: AppStore,
    router: new VueRouter({ mode: 'history', routes: routes }),
    render: h => h(require('./components/app/app.vue.html'))
});
