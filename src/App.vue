<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title class="header-title">
          EngagED Code Challenge
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-menu">
      <VerticalNavMenu />
    </q-drawer>

    <q-page-container>
      <div class="rm-container">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import VerticalNavMenu from './components/VerticalNavMenu/VerticalNavMenu';

export default {
  name: 'LayoutDefault',

  components: {
    VerticalNavMenu,
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>
<style lang="scss">
.rm-container {
  padding: 20px 30px;
}
</style>
