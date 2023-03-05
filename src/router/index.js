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
        /* webpackChunkName: "character" */ '@/views/characters/Character.vue'
      ),
  },
  {
    path: '/locations',
    name: 'LocationsList',
    component: () =>
      import(
        /* webpackChunkName: "locationsList" */ '@/views/locations/LocationsList.vue'
      ),
  },
  {
    path: '/locations/:locationId',
    name: 'Location',
    component: () =>
      import(
        /* webpackChunkName: "location" */ '@/views/locations/Location.vue'
      ),
  },
  {
    path: '/episodes',
    name: 'EpisodesList',
    component: () =>
      import(
        /* webpackChunkName: "EpisodesList" */ '@/views/episodes/EpisodesList.vue'
      ),
  },
  {
    path: '/episodes/:episodeId',
    name: 'Episode',
    component: () =>
      import(/* webpackChunkName: "Episodes" */ '@/views/episodes/Episode.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
