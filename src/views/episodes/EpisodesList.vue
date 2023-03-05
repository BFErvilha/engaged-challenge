<template>
  <div class="row justify-content-between">
    <div class="col-12">
      <h2 class="rm-card-title">Episodios:</h2>
    </div>
    <div class="col-md-6">
      <p class="ep-list-text">
        Foram lançados &nbsp;
        <span>{{ list.count }} &nbsp; </span> episódios
      </p>
    </div>
    <div class="col-md-6 flex flex-end">
      <q-pagination
        class="rm-pagination"
        v-model="currentPage"
        color="teal"
        :max="list.totalPages"
        :max-pages="list.totalPages"
        input
        input-class="text-light-green"
      />
    </div>

    <div class="col-12">
      <Loading class="col-12" v-if="isLoading" />
      <div v-else class="row q-col-gutter-md justify-content-center">
        <div
          class="col-12 col-md-6 col-lg-3"
          v-for="episode in list.episodes"
          :key="episode.id"
        >
          <EpisodeCard :episode="episode" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GraphQLClient, gql } from 'graphql-request';
import { reactive, ref, watch } from 'vue';
// import router from '@/router';
import { useStore } from 'vuex';

import Loading from '@/components/Loading.vue';
import EpisodeCard from '@/components/Episodes/EpisodeCard.vue';
const query = gql`
  query ($page: Int!, $name: String, $episode: String) {
    episodes(page: $page, filter: { name: $name, episode: $episode }) {
      info {
        pages
        count
      }
      results {
        id
        episode
        name
        air_date
        characters {
          id
        }
      }
    }
  }
`;
export default {
  // eslint-disable-next-line
  name: 'EpisodesList',
  components: {
    Loading,
    EpisodeCard,
  },
  setup() {
    const list = reactive({
      episodes: null,
      page: 1,
      name: '',
      episode: '',
      totalPages: 0,
      count: 0,
    });
    const currentPage = ref(1);
    const filterName = ref('');
    const filterEpisode = ref('');

    const isLoading = ref(true);
    const store = useStore();
    const listRequest = new GraphQLClient(store.getters.graphqlUrl);

    const loadEpisodes = async (page, name, episode) => {
      const filter = {
        page,
        name,
        episode,
      };

      const data = await listRequest.request(query, filter);

      return data.episodes;
    };

    const loadingEpisodesPage = async () => {
      isLoading.value = true;

      list.page = currentPage.value;
      list.name = filterName.value;
      list.episode = filterEpisode.value;

      const result = await loadEpisodes(list.page, list.name, list.episode);

      list.episodes = result.results;
      list.count = result.info.count;
      list.totalPages = result.info.pages;
      isLoading.value = false;
    };

    loadingEpisodesPage();

    watch([currentPage, filterName, filterEpisode], () => {
      loadingEpisodesPage();
    });

    return {
      list,
      currentPage,
      filterName,
      filterEpisode,
      isLoading,
    };
  },
};
</script>

<style></style>
