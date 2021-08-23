import Vue from 'vue';
import VueRouter from 'vue-router';
import route from './route'

Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  route,
});

export default router;
