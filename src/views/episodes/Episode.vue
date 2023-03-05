<template>
  <div>
    <Loading v-if="isLoading" />
    <div v-else class="row justify-content-between">
      <div class="col-12" style="margin-bottom: 20px">
        <h2 class="rm-card-title">Episódio:</h2>
      </div>
      <div class="col-12">
        <q-card class="my-card rm-card-character rm-card-shadow">
          <q-card-section>
            <div class="row justify-content-between">
              <div class="col-4">
                <p class="info">
                  Nome: <br /><span>{{ ep.info.name }}</span>
                </p>
              </div>
              <div class="col-4">
                <p class="info">
                  Temporada: <br /><span> {{ ep.info.episode }}</span>
                </p>
              </div>
              <div class="col-4">
                <p class="info">
                  Lançou em:<br /><span> {{ ep.info.air_date }}</span>
                </p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12" style="margin-top: 30px">
        <h2 class="rm-card-title">Personagens:</h2>
      </div>
      <div class="col-12">
        <ChractecterCardList :characters="ep.characters" />
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
import { ref, onMounted, watch, reactive } from 'vue';
import { GraphQLClient, gql } from 'graphql-request';
import router from '@/router';
import { useStore } from 'vuex';

import Loading from '@/components/Loading.vue';
import ChractecterCardList from '@/components/Characters/CharacterCardList';

const requestEpisodeById = gql`
  query getEpisodeById($id: ID!) {
    episode(id: $id) {
      id
      episode
      name
      air_date
      characters {
        id
        name
        image
        status
      }
    }
  }
`;

export default {
  // eslint-disable-next-line
  name: 'Episode',
  components: {
    ChractecterCardList,
    Loading,
  },
  setup() {
    const store = useStore();
    const { episodeId } = router.currentRoute._value.params;
    const episodeInfo = reactive({
      episode: null,
    });

    const ep = reactive({
      info: null,
      characters: null,
    });

    const isLoading = ref(true);
    const graphqlLink = store.getters.graphqlUrl;
    const listRequest = new GraphQLClient(graphqlLink);

    const loadEpisode = async (id) => {
      const filter = {
        id,
      };
      const data = await listRequest.request(requestEpisodeById, filter);
      return data.episode;
    };

    const loadingEpisode = async () => {
      isLoading.value = true;

      const result = await loadEpisode(episodeId);
      episodeInfo.episode = result;
      refineRsults(episodeInfo);
      isLoading.value = false;
    };

    const refineRsults = (data) => {
      ep.info = {
        name: data.episode.name,
        episode: data.episode.episode,
        air_date: data.episode.air_date,
      };
      ep.characters = data.episode.characters;
    };
    onMounted(async () => {
      loadingEpisode();
    });

    return {
      ep,
      isLoading,
    };
  },
};
</script>

<style></style>
