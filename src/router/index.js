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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
