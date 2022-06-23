import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局样式
import './style/global.css'
// 樱花落下效果
import './utils/backgroundEffect.js';
// 监听用户是否离开站点
import './utils/pageVisibilityWatch';

createApp(App).use(router).use(store).mount('#app');


