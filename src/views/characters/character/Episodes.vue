<template>
  <q-card class="my-card rm-card-character rm-card-shadow">
    <q-card-section>
      <div class="row q-col-gutter-md justify-content-between">
        <div class="col-12">
          <h2 class="rm-card-title">Episódios:</h2>
        </div>
        <div class="col-md-6">
          <p class="ep-list-text">
            Aparece em: &nbsp;
            <span>{{ episodes.length }} &nbsp; </span> episódios
          </p>
        </div>
        <div class="col-md-6 flex flex-end">
          <q-pagination
            class="rm-pagination"
            v-model="currentEpPage"
            color="teal"
            :max="totalEpPages"
            :max-pages="totalEpPages"
            input
            input-class="text-light-green"
          />
        </div>
        <div class="col-12">
          <EpisodesList :episodesList="paginatedEpisodes" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, computed } from 'vue';
import EpisodesList from '@/views/characters/character//EpisodesList';
export default {
  // eslint-disable-next-line
  name: 'Episodes',
  components: {
    EpisodesList,
  },
  props: {
    episodes: { type: Object, required: true },
  },
  setup(props) {
    const currentEpPage = ref(1);
    const epPerPage = ref(10);
    const totalEpPages = computed(() =>
      Math.ceil(props.episodes.length / epPerPage.value),
    );

    const paginatedEpisodes = computed(() => {
      const startIndex = (currentEpPage.value - 1) * epPerPage.value;
      const endIndex = startIndex + epPerPage.value;
      return props.episodes.slice(startIndex, endIndex);
    });

    return {
      paginatedEpisodes,
      currentEpPage,
      totalEpPages,
    };
  },
};
</script>

<style lang="scss" scoped>
.ep-list-text {
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  margin-top: 10px;
  font-size: 18px;
}
</style>
