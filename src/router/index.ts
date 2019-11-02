import Vue from 'vue';
import VueRouter from 'vue-router';

import AdminSockets from '@/views/admin/AdminSockets.vue';
import Home from '@/views/Home.vue';
import Messages from '@/views/Messages.vue';
import MessagesHistorical from '@/views/MessagesHistorical.vue';
import MessagesLive from '@/views/MessagesLive.vue';
import Stations from '@/views/Stations.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/admin/sockets',
    name: 'admin_sockets',
    component: AdminSockets,
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages,
  },
  {
    path: '/messages/historical',
    name: 'messages_historical',
    component: MessagesHistorical,
  },
  {
    path: '/messages/live',
    name: 'messages_live',
    component: MessagesLive,
  },
  {
    path: '/stations',
    name: 'stations',
    component: Stations,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
