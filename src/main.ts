import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import GameOptions from '@/services/GameOptions';

Vue.config.productionTip = false;

const gameOptions = new GameOptions();

new Vue({
    router,
    render: h => h(App),
    data: () => ({
        gameOptions
    })
}).$mount('#app')
