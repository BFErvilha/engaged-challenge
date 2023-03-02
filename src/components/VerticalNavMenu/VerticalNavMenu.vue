<template>
  <q-list>
    <q-item-label header>Menu</q-item-label>
    <q-item clickable tag="a" to="/characters">
      <q-item-section avatar>
        <q-icon name="school" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Personagens</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      tag="a"
      target="_blank"
      href="https://github.com/quasarframework/"
    >
      <q-item-section avatar>
        <q-icon name="code" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Locais</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
      <q-item-section avatar>
        <q-icon name="chat" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Episódios</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {};
</script>

<style></style>
