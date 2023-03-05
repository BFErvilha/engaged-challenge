import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/characters',
    name: 'CharacterList',
    component: () =>
      import(
        /* webpackChunkName: "charactersList" */ '@/views/characters/CharactersList.vue'
      ),
  },
  {
    path: '/characters/:characterId',
    name: 'Character',
    component: () =>
      import(
        /* webpackChunkName: "charactersList" */ '@/views/characters/Character.vue'
      ),
  },
  {
    path: '/locations',
    name: 'LocationsList',
    component: () =>
      import(
        /* webpackChunkName: "locations" */ '@/views/locations/LocationsList.vue'
      ),
  },
  {
    path: '/locations/:locationId',
    name: 'Locations',
    component: () =>
      import(
        /* webpackChunkName: "locations" */ '@/views/locations/Location.vue'
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
