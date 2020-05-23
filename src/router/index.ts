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
import Airframes from '@/views/Airframes.vue';
import Flights from '@/views/Flights.vue';
import Home from '@/views/Home.vue';
import Leaderboard from '@/views/Leaderboard.vue';
import Login from '@/views/auth/Login.vue';
import MessageDetail from '@/views/MessageDetail.vue';
import Messages from '@/views/Messages.vue';
import MessagesHistorical from '@/views/MessagesHistorical.vue';
import MessagesLive from '@/views/MessagesLive.vue';
import MyIp from '@/views/MyIp.vue';
import Register from '@/views/auth/Register.vue';
import Stations from '@/views/Stations.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Airframes - Community sourced realtime aircraft data via ACARS, VDL, SATCOM and ADS-C',
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About Airframes',
    },
  },
  {
    path: '/auth/login',
    name: 'auth_login',
    component: Login,
    meta: { title: 'Login to Airframes', layout: 'no-navigation' },
  },
  {
    path: '/auth/register',
    name: 'auth_register',
    component: Register,
    meta: { title: 'Create an Airframes Account', layout: 'no-navigation' },
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
    meta: {
      title: 'Admin Stats',
    },
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
    path: '/airframes',
    name: 'airframes',
    component: Airframes,
    meta: {
      title: 'Known Airframes',
    },
  },
  {
    path: '/flights',
    name: 'flights',
    component: Flights,
    meta: {
      title: 'Active Flights',
    },
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages,
    meta: {
      title: 'Messages',
    },
  },
  {
    path: '/messages/historical',
    name: 'messages_historical',
    component: MessagesHistorical,
    props: true,
    meta: {
      title: 'Historical Messages',
    },
  },
  {
    path: '/messages/live',
    name: 'messages_live',
    component: MessagesLive,
    meta: {
      title: 'Live Messages',
    },
  },
  {
    path: '/messages/:id',
    name: 'message_detail',
    component: MessageDetail,
    meta: {
      title: 'Message Detail',
    },
  },
  {
    path: '/myip',
    name: 'myip',
    component: MyIp,
    meta: {
      title: 'About My IP',
    },
  },
  {
    path: '/stations',
    name: 'stations',
    component: Stations,
    meta: {
      title: 'Feeder Stations',
    },
  },
  {
    path: '/stations/leaderboard',
    name: 'leaderboard',
    component: Leaderboard,
    meta: {
      title: 'Leaderboard',
    },
  },
  {
    path: '/stations/leaderboard/:date',
    name: 'leaderboard_date',
    component: Leaderboard,
    meta: {
      title: 'Leaderboard for Date',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's
  // will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  next();
});

export default router;
