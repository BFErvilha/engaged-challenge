<template>
  <q-list>
    <q-item-label class="menu-title" header>Menu</q-item-label>
    <q-item class="menu-item" clickable tag="a" to="/characters">
      <q-item-section avatar>
        <Rick />
      </q-item-section>
      <q-item-section>
        <q-item-label>Personagens</q-item-label>
      </q-item-section>
    </q-item>
    <q-item class="menu-item" clickable tag="a" to="/locations">
      <q-item-section avatar>
        <Morty />
      </q-item-section>
      <q-item-section>
        <q-item-label>Locais</q-item-label>
      </q-item-section>
    </q-item>
    <!-- <q-item
      class="menu-item"
      clickable
      tag="a"
      target="_blank"
      href="https://chat.quasar.dev"
    >
      <q-item-section avatar>
        <Jerry />
      </q-item-section>
      <q-item-section>
        <q-item-label>Episódios</q-item-label>
      </q-item-section>
    </q-item> -->
  </q-list>
</template>
<script>
import Rick from './icons/rick.vue';
import Morty from './icons/morty.vue';
// import Jerry from './icons/jerry.vue';
export default {
  components: {
    Rick,
    Morty,
    // Jerry,
  },
};
</script>

<style></style>
