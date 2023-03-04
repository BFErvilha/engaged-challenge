<template>
  <div>
    <Loading v-if="isLoading" />
    <div v-else class="row q-col-gutter-md">
      <div
        class="col-sm-6 col-md-3"
        v-for="character in list.characters"
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
      <div class="col-md-12 flex flex-center rm-pagination-container">
        <q-pagination
          class="rm-pagination"
          v-model="list.page"
          color="teal"
          :max="10"
          :max-pages="list.totalPages"
          :boundary-numbers="false"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { GraphQLClient, gql } from 'graphql-request';
import { reactive, ref, watchEffect } from 'vue';
import router from '@/router';
import { useStore } from 'vuex';

import Loading from '@/components/Loading.vue';

const query = gql`
  query ($page: Int!, $name: String!, $status: String!) {
    characters(page: $page, filter: { name: $name, status: $status }) {
      info {
        pages
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
      }
    }
  }
`;
export default {
  name: 'CharactersList',
  components: {
    Loading,
  },
  setup() {
    const list = reactive({
      characters: null,
      page: 1,
      name: '',
      status: '',
      totalPages: 0,
      pageSize: 8,
    });
    const isLoading = ref(true);
    const store = useStore();
    const listRequest = new GraphQLClient(store.getters.graphqlUrl);

    const loadCharacters = async (page, name, status) => {
      const filter = {
        page,
        name,
        status,
      };

      const data = await listRequest.request(query, filter);

      return data.characters;
    };

    const loadingCharactersPage = async () => {
      isLoading.value = true;

      const result = await loadCharacters(list.page, list.name, list.status);

      list.characters = result.results;
      list.totalPages = result.info.pages;
      isLoading.value = false;
    };

    loadingCharactersPage();

    watchEffect(() => {
      loadingCharactersPage();
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
      list,
      vefifyStatus,
      toDetails,
      isLoading,
    };
  },
};
</script>

<style lang="scss">
.rm-card {
  position: relative;
  width: 225px;
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

.rm-pagination-container {
  height: 50px;
  padding: 30px 0;

  .rm-pagination {
    .q-btn {
      padding: 10px 15px !important;
    }
  }
}
</style>
