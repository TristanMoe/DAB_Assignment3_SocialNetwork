import Vue from 'vue';
import Vuex from 'vuex';
import * as dbq from "./databaseQueries";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: ''
    },
    mutations: {
        setUser: (state, payload) => {
            state.user = payload["newUser"];
            console.log(`User sat to ${state.user}`);
        }
    },
    getters: {
        getUser: state => {
            return state.user;
        }
    }
})