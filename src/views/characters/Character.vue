<template>
  <div style="padding: 20px 30px">
    <!-- <div v-for="character in requestChar" :key="character.id"> -->
    <div class="row q-col-gutter-md">
      <div class="col-2">
        <q-card class="my-card rm-card-profile">
          <q-img :src="requestChar.image">
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ requestChar.name }}
            </div>
          </q-img>
        </q-card>
      </div>
      <div class="col-5">
        <div style="margin-bottom: 25px">
          <q-card class="my-card">
            <q-card-section>
              <p>Nome: {{ requestChar.name }}</p>
              <p>Status: {{ requestChar.status }}</p>
              <p>Espécie: {{ requestChar.species }}</p>
              <p>Tipo: {{ requestChar.type }}</p>
              <p>Genero: {{ requestChar.gender }}</p>
              <p>Origem: {{ requestChar.origin }}</p>
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-6">
            Aparece em: {{ episodes.eps.length }} episódios
          </div>
          <div class="col-6 flex flex-end">
            <q-pagination v-model="currentEpPage" :max="totalEpPages" />
          </div>
          <div class="col-12">
            <EpisodesList :episodesList="paginatedEpisodes" />
          </div>
        </div>
      </div>
      <div class="col-5">
        <div style="margin-bottom: 25px">
          <q-card class="my-card">
            <q-card-section>
              <p>Nome: {{ locationChar.name }}</p>
              <p>Tipo: {{ locationChar.type }}</p>
              <p>Dimensão: {{ locationChar.dimension }}</p>
            </q-card-section>
          </q-card>
        </div>
        <div class="row">
          <div class="col-6">
            Residentes total de {{ locationChar.name }}:
            {{ totalResidents }}
          </div>
          <div class="col-6 flex flex-end">
            <q-pagination
              v-model="currentResidentsPage"
              :max="totalResidentsPages"
            />
          </div>
          <div class="col-12" style="margin-top: 10px">
            <q-card class="my-card">
              <q-card-section>
                <div class="row q-col-gutter-md">
                  <div
                    class="col-sm-6 col-md-3"
                    v-for="resident in paginatedResidents"
                    :key="resident.id"
                  >
                    <q-card class="my-card rm-card-profile rm-residents">
                      <q-img :src="resident.image">
                        <q-tooltip
                          transition-show="flip-right"
                          transition-hide="flip-left"
                        >
                          {{ resident.name }}
                        </q-tooltip>
                      </q-img>
                    </q-card>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, reactive, toRaw } from 'vue';
import { GraphQLClient, gql } from 'graphql-request';
import router from '@/router';
import EpisodesList from './EpisodesList';
import { useStore } from 'vuex';

const requestCharacterById = gql`
  query getCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
      }
      image
    }
  }
`;
const requestLocationByCharacterId = gql`
  query getLocationCharacter($id: ID!) {
    character(id: $id) {
      location {
        id
        name
        type
        dimension
        residents {
          id
          name
          image
        }
      }
    }
  }
`;
const requestEpisodesByCharacterId = gql`
  query getEpisodesCharacter($id: ID!) {
    character(id: $id) {
      episode {
        id
        name
        air_date
      }
    }
  }
`;
export default {
  // eslint-disable-next-line
  name: 'Character',
  components: {
    EpisodesList,
  },
  setup() {
    const { characterId } = router.currentRoute._value.params;
    const requestChar = ref({});
    const locationChar = ref({});
    const locationResidents = reactive({
      residents: [],
    });
    const totalResidents = ref(0);
    const episodes = reactive({
      eps: [],
    });
    const isLoading = ref(true);
    const store = useStore();
    const graphqlLink = store.getters.graphqlUrl;
    const listRequest = new GraphQLClient(graphqlLink);

    const getCharacterById = async (id) => {
      listRequest
        .request(requestCharacterById, {
          id,
        })
        .then((data) => {
          requestChar.value = { ...data.character };
          isLoading.value = false;
        })
        .catch((error) => {
          console.error(error);
          isLoading.value = false;
        });
    };

    const getLocation = async (id) => {
      listRequest
        .request(requestLocationByCharacterId, {
          id,
        })
        .then((data) => {
          locationChar.value = { ...data.character.location };
          locationResidents.residents = data.character.location.residents;
          totalResidents.value = countTotal(locationResidents.residents);
          isLoading.value = false;
        })
        .catch((error) => {
          console.error(error);
          isLoading.value = false;
        });
    };

    const getEpisodes = async (id) => {
      listRequest
        .request(requestEpisodesByCharacterId, {
          id,
        })
        .then((data) => {
          episodes.eps = data.character.episode;
          isLoading.value = false;
        })
        .catch((error) => {
          console.error(error);
          isLoading.value = false;
        });
    };

    onMounted(async () => {
      getCharacterById(characterId);
      getLocation(characterId);
      getEpisodes(characterId);
    });

    const currentEpPage = ref(1);
    const epPerPage = ref(10);
    const totalEpPages = computed(() =>
      Math.ceil(episodes.eps.length / epPerPage.value),
    );

    const paginatedEpisodes = computed(() => {
      const startIndex = (currentEpPage.value - 1) * epPerPage.value;
      const endIndex = startIndex + epPerPage.value;
      return episodes.eps.slice(startIndex, endIndex);
    });

    const currentResidentsPage = ref(1);
    const residentsPerPage = ref(12);
    const totalResidentsPages = computed(() =>
      Math.ceil(totalResidents.value / residentsPerPage.value),
    );

    const paginatedResidents = computed(() => {
      const startIndex =
        (currentResidentsPage.value - 1) * residentsPerPage.value;
      const endIndex = startIndex + residentsPerPage.value;
      return locationResidents.residents.slice(startIndex, endIndex);
    });

    const countTotal = (data) => {
      let rawData = toRaw(data);
      let count = 0;
      // eslint-disable-next-line
      Object.keys(rawData).forEach((key) => {
        count++;
      });
      return count;
    };

    return {
      requestChar,
      getCharacterById,
      getEpisodes,
      getLocation,
      locationChar,
      locationResidents,
      totalResidents,
      episodes,
      totalEpPages,
      paginatedEpisodes,
      currentEpPage,
      countTotal,
      paginatedResidents,
      totalResidentsPages,
      currentResidentsPage,
    };
  },
};
</script>

<style lang="scss">
.rm-card-profile {
  margin: 30px auto;
  border-radius: 50% 10% / 20% 60%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background: radial-gradient(
    circle at 0% 0%,
    #5cad4a,
    #208d45,
    #f0f2eb,
    #a7cb54,
    #0d0d0d
  );
  padding: 3px;

  &.rm-residents {
    width: 100px;
  }
}
</style>
