<template>
  <div>
    <Loading v-if="isLoading" />
    <div v-else class="row justify-content-between">
      <div class="col-12 col-md-4 col-lg-2">
        <q-card class="my-card rm-card-profile">
          <q-img :src="char.info.image">
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ char.info.name }}
            </div>
          </q-img>
        </q-card>
      </div>
      <div class="col-12 col-md-7 col-lg-10">
        <div class="row justify-content-between" style="padding: 20px 30px">
          <div class="col-12 col-lg-6 p-10">
            <CharacterInfo style="margin-top: 10px" :character="char.info" />
          </div>
          <div class="col-12 col-lg-6 p-10">
            <LocationInfo style="margin-top: 10px" :location="char.location" />
          </div>
          <div class="col-12 col-lg-6 p-10">
            <Episodes :episodes="char.episodes" />
          </div>
          <div class="col-12 col-lg-6 p-10">
            <Residents :residents="char.locationResidents" />
          </div>
        </div>
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

import CharacterInfo from '@/views/characters/character/CharacterInfo';
import LocationInfo from '@/views/characters/character/LocationInfo';
import Episodes from '@/views/characters/character/Episodes';
import Residents from '@/views/characters/character/Residents.vue';

const requestCharacterById = gql`
  query getCharacterById($id: ID!) {
    character(id: $id) {
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
    CharacterInfo,
    LocationInfo,
    Episodes,
    Loading,
    Residents,
  },
  setup() {
    const store = useStore();
    const { characterId } = router.currentRoute._value.params;
    const characterInfo = reactive({
      character: null,
    });

    const char = reactive({
      info: null,
      location: null,
      locationResidents: null,
      episodes: null,
    });

    const isLoading = ref(true);
    const graphqlLink = store.getters.graphqlUrl;
    const listRequest = new GraphQLClient(graphqlLink);

    const loadCharacter = async (id) => {
      const filter = {
        id,
      };
      const data = await listRequest.request(requestCharacterById, filter);
      return data.character;
    };

    const loadingCharacter = async () => {
      isLoading.value = true;

      const result = await loadCharacter(characterId);
      characterInfo.character = result;
      refineRsults(characterInfo);
      isLoading.value = false;
    };

    const refineRsults = (data) => {
      char.info = {
        name: data.character.name,
        gender: data.character.gender,
        image: data.character.image,
        specie: data.character.species,
        status: data.character.status,
        type: data.character.type,
        origin: data.character.origin['name'],
      };
      char.location = {
        name: data.character.location.name,
        dimension: data.character.location.dimension,
        type: data.character.location.type,
      };
      char.locationResidents = data.character.location.residents;
      char.episodes = data.character.episode;
    };

    onMounted(async () => {
      loadingCharacter(characterId);
    });

    return {
      isLoading,
      char,
    };
  },
};
</script>

<style lang="scss">
.rm-card-profile {
  margin: 30px auto;
  max-width: 300px;
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
