<template>
  <q-card
    class="my-card rm-card-character rm-card-shadow p-10"
    style="margin-top: 20px"
  >
    <div class="row q-col-gutter-md justify-content-between">
      <div class="col-12">
        <p class="info">
          Nome: <br /><span>{{ episode.name }}</span>
        </p>
      </div>
      <div class="col-6">
        <p class="info">
          Temporada: <br /><span>{{ episode.episode }}</span>
        </p>
      </div>
      <div class="col-6">
        <p class="info">
          Lançou em: <br /><span>{{ episode.air_date }}</span>
        </p>
      </div>
      <div class="col-7">
        <p class="info-characters">
          Apareceram <span>{{ episode.characters.length }}</span>
          personagens
        </p>
      </div>

      <div class="col-5 text-right">
        <q-btn class="rm-btn" flat @click="toEpisode(episode.id)"
          >Detalhes</q-btn
        >
      </div>
    </div>
  </q-card>
</template>

<script>
import router from '@/router';
export default {
  name: 'EpisodeCard',
  props: {
    episode: { type: Object, required: true },
  },
  setup() {
    const toEpisode = (id) => {
      router.push({ name: 'Episode', params: { episodeId: id } });
    };
    return {
      toEpisode,
    };
  },
};
</script>

<style lang="scss" scoped>
.rm-card-character {
  cursor: pointer;
  &:hover {
    background: #20422cdb;
  }
}
</style>
