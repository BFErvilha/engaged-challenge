<template>
  <q-list bordered separator>
    <q-item v-ripple v-for="episode in episodesList" :key="episode.id">
      <q-item-section>
        {{ episode.name }} em {{ episode.air_date }}</q-item-section
      >
    </q-item>
  </q-list>
</template>
<script>
export default {
  name: 'EpisodesList',
  props: {
    episodesList: { type: Object, required: true },
  },
};
</script>
