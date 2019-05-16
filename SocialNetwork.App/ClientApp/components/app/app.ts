import Vue from 'vue';

import { Component } from 'vue-property-decorator';
import { ApplicationState } from "../../databaseQueries";


@Component({
    components: {
        MenuComponent: require('../navmenu/navmenu.vue.html')
    }
})

export default class AppComponent extends Vue {
    static applicationState : ApplicationState = new ApplicationState();
}


