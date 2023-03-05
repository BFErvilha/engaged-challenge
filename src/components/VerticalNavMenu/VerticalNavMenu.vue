<template>
  <q-list>
    <q-item-label class="menu-title" header>Menu</q-item-label>
    <q-item class="menu-item" clickable tag="a" to="/">
      <q-item-section avatar>
        <RickMorty />
      </q-item-section>
      <q-item-section>
        <q-item-label>Home</q-item-label>
      </q-item-section>
    </q-item>
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
    <q-item class="menu-item" clickable tag="a" to="/episodes">
      <q-item-section avatar>
        <Jerry />
      </q-item-section>
      <q-item-section>
        <q-item-label>Episódios</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import Rick from '@/components/VerticalNavMenu/icons/rick';
import Morty from '@/components/VerticalNavMenu/icons/morty.vue';
import Jerry from '@/components/VerticalNavMenu/icons/jerry.vue';
import RickMorty from '@/components/VerticalNavMenu/icons/RickMorty.vue';

export default {
  components: {
    Rick,
    Morty,
    Jerry,
    RickMorty,
  },
};
</script>

<style></style>
