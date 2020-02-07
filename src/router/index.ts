import Vue from 'vue';
import VueRouter from 'vue-router';

import AdminSockets from '@/views/admin/AdminSockets.vue';
import AdminStats from '@/views/admin/AdminStats.vue';
import AdminStatsAirlines from '@/views/admin/stats/AdminStatsAirlines.vue';
import AdminStatsAirframes from '@/views/admin/stats/AdminStatsAirframes.vue';
import AdminStatsErrors from '@/views/admin/stats/AdminStatsErrors.vue';
import AdminStatsFlights from '@/views/admin/stats/AdminStatsFlights.vue';
import AdminStatsFrequencies from '@/views/admin/stats/AdminStatsFrequencies.vue';
import AdminStatsMessageLabels from '@/views/admin/stats/AdminStatsMessageLabels.vue';
import AdminStatsStations from '@/views/admin/stats/AdminStatsStations.vue';
import Flights from '@/views/Flights.vue';
import Home from '@/views/Home.vue';
import MessageDetail from '@/views/MessageDetail.vue';
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
    path: '/admin/stats',
    name: 'admin_stats',
    component: AdminStats,
  },
  {
    path: '/admin/stats/airlines',
    name: 'admin_stats_airlines',
    component: AdminStatsAirlines,
  },
  {
    path: '/admin/stats/airframes',
    name: 'admin_stats_airframes',
    component: AdminStatsAirframes,
  },
  {
    path: '/admin/stats/errors',
    name: 'admin_stats_errors',
    component: AdminStatsErrors,
  },
  {
    path: '/admin/stats/flights',
    name: 'admin_stats_flights',
    component: AdminStatsFlights,
  },
  {
    path: '/admin/stats/frequencies',
    name: 'admin_stats_frequencies',
    component: AdminStatsFrequencies,
  },
  {
    path: '/admin/stats/labels',
    name: 'admin_stats_labels',
    component: AdminStatsMessageLabels,
  },
  {
    path: '/admin/stats/stations',
    name: 'admin_stats_stations',
    component: AdminStatsStations,
  },
  {
    path: '/flights',
    name: 'flights',
    component: Flights,
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
    props: true,
  },
  {
    path: '/messages/live',
    name: 'messages_live',
    component: MessagesLive,
  },
  {
    path: '/messages/:id',
    name: 'message_detail',
    component: MessageDetail,
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
