<template>
  <div>
    <div class="text-center" v-if="isLoading">
      <q-spinner-ball color="green" size="30em" />
    </div>
    <div v-else class="row q-col-gutter-md">
      <div
        class="col-sm-12 col-md-3"
        v-for="character in paginatedCharacters"
        :key="character.id"
      >
        <q-card class="my-card rm-card">
          <q-img :class="vefifyStatus(character.status)" :src="character.image">
            <div class="absolute-bottom">
              <div class="text-h6">{{ character.name }}</div>
              <div class="text-subtitle2">Status: {{ character.status }}</div>
            </div>
          </q-img>

          <q-card-actions class="justify-content-center">
            <q-btn class="rm-btn" flat @click="toDetails(character.id)"
              >Detalhes</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-12 flex flex-center">
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          direction-links
          push
          color="teal"
          active-design="push"
          active-color="orange"
          :boundary-numbers="false"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { gql } from 'graphql-tag';
import { GraphQLClient } from 'graphql-request';
import { reactive, onMounted, ref, computed } from 'vue';
import router from '@/router';
import { useStore } from 'vuex';

const query = gql`
  query {
    characters {
      results {
        id
        name
        image
        status
      }
    }
  }
`;
export default {
  name: 'CharactersList',
  setup() {
    const characters = reactive({
      characters: [],
    });
    const isLoading = ref(true);
    const store = useStore();
    const graphqlLink = store.getters.graphqlUrl;

    onMounted(async () => {
      const listRequest = new GraphQLClient(graphqlLink);
      listRequest
        .request(query)
        .then((data) => {
          characters.characters = data.characters.results;
          isLoading.value = false;
        })
        .catch((error) => {
          console.error(error);
          isLoading.value = false;
        });
    });

    const currentPage = ref(1);
    const itemsPerPage = ref(8);
    const totalPages = computed(() =>
      Math.ceil(characters.characters.length / itemsPerPage.value),
    );

    const paginatedCharacters = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      const endIndex = startIndex + itemsPerPage.value;
      return characters.characters.slice(startIndex, endIndex);
    });

    const vefifyStatus = (status) => {
      switch (status) {
        case 'Dead':
          return status;
        case 'unknown':
          return status;
        default:
          return status;
      }
    };

    const toDetails = (id) => {
      router.push({ name: 'Character', params: { characterId: id } });
    };
    return {
      characters,
      vefifyStatus,
      currentPage,
      totalPages,
      paginatedCharacters,
      toDetails,
      isLoading,
    };
  },
};
</script>

<style lang="scss">
.rm-card {
  position: relative;
  width: 300px;
  margin: 30px auto;
  border-radius: 50% 10% / 20% 60%;
  border-width: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background: radial-gradient(
    circle at 0% 0%,
    #5cad4a,
    #208d45,
    #f0f2eb,
    #a7cb54,
    #0d0d0d
  );
  background-clip: padding-box;
  transition: 0.3s;

  &:hover {
    transform: rotate(5deg);
  }

  img {
    border-radius: 50% 10% / 20% 60%;
  }
  .Dead {
    img {
      filter: grayscale(1);
      &:hover {
        filter: grayscale(0);
      }
    }
  }

  .unknown {
    img {
      filter: sepia(1);
      &:hover {
        filter: sepia(0);
      }
    }
  }

  .absolute-bottom {
    border-radius: 45% 30%/92% 20%;
    width: 220px;
    margin: 0 auto;
    text-align: center;
    box-sizing: border-box;
  }
}
</style>
