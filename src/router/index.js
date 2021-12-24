import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '@/views/Main.vue';
import PageWithPagination from '@/views/PageWithPagination.vue';
import PageWithInfinityScroll from '@/views/PageWithInfinityScroll.vue';
import PageWithVirtualScroll from '@/views/PageWithVirtualScroll.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/pagination',
    name: 'pagination',
    component: PageWithPagination,
  },
  {
    path: '/infinity',
    name: 'infinity',
    component: PageWithInfinityScroll,
  },
  {
    path: '/virtual',
    name: 'virtual',
    component: PageWithVirtualScroll,
  }
];

export default  new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
