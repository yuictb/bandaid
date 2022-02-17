import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
// 全局样式
import './assets/global.css'
// 全局组件
import Types from './components/Types.vue';
import Touchss from './components/Touchss.vue'

createApp(App).component('types',Types).component('touchss',Touchss).use(store).use(router).mount('#app')