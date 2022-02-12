import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局样式
import './assets/global.css'
// 全局组件
import Types from './components/Types.vue';
createApp(App).component('types',Types).use(store).use(router).mount('#app')
