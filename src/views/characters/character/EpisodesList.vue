<template>
  <q-list dense separator>
    <q-item v-ripple v-for="episode in episodesList" :key="episode.id">
      <q-item-section>
        <div class="row justify-content-between episode-item">
          <div class="col-6">
            <p class="name">
              Nome: <br />
              <span>{{ episode.name }}</span>
            </p>
          </div>
          <div class="col-6">
            <p class="air-date">
              Lançou em: <br />
              <span>{{ episode.air_date }}</span>
            </p>
          </div>
        </div>
      </q-item-section>
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
<style lang="scss" scoped>
.episode-item {
  .name {
    font-size: 14px;
    margin-bottom: 0px;
    span {
      font-size: 18px;
    }
  }
  .air-date {
    font-size: 14px;
    margin-bottom: 0px;
    span {
      font-size: 18px;
    }
  }
}
</style>
