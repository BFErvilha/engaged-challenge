<template>
  <div class="row">
    <div class="col-12">
      <form
        @submit.prevent
        style="display: flex; justify-content: flex-end; margin-right: 10px"
      >
        <q-input
          outlined
          v-model="filterName"
          label="Nome do Personagem"
          class="rm-input"
        />

        <q-select
          outlined
          v-model="filterStatus"
          :options="statusOptions"
          label="Status"
          class="rm-input"
        />
      </form>
    </div>
    <Loading class="col-12" v-if="isLoading" />
    <div v-else class="row justify-content-between">
      <div
        class="col-sm-6 col-md-4 col-lg-3"
        v-for="character in list.characters"
        :key="character.id"
      >
        <q-card class="my-card rm-card">
          <q-img :class="vefifyStatus(character.status)" :src="character.image">
            <div class="absolute-bottom">
              <div class="name">{{ character.name }}</div>
              <div class="status">Status: {{ character.status }}</div>
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
          v-model="currentPage"
          color="teal"
          :max="list.totalPages"
          :max-pages="list.totalPages"
          input
          input-class="text-primary"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { GraphQLClient, gql } from 'graphql-request';
import { reactive, ref, watch } from 'vue';
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
    const currentPage = ref(1);
    const filterName = ref('');
    const filterStatus = ref('');
    const store = useStore();
    const listRequest = new GraphQLClient(store.getters.graphqlUrl);
    const statusOptions = [
      { label: 'Todos', value: '' },
      { label: 'Vivo', value: 'Alive' },
      { label: 'Morto', value: 'Dead' },
      { label: 'Desconhecido', value: 'unknown' },
    ];

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

      list.page = currentPage.value;
      list.name = filterName.value;
      list.status = filterStatus.value.value
        ? filterStatus.value.value
        : filterStatus.value;

      const result = await loadCharacters(list.page, list.name, list.status);

      list.characters = result.results;
      list.totalPages = result.info.pages;
      isLoading.value = false;
    };

    loadingCharactersPage();

    watch([currentPage, filterName, filterStatus], () => {
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
      store.dispatch('changeToNewCharacter', id);
      router.push({ name: 'Character', params: { characterId: id } });
    };

    return {
      list,
      vefifyStatus,
      toDetails,
      isLoading,
      currentPage,
      filterName,
      filterStatus,
      statusOptions,
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

  @media (max-width: 600px) {
    width: 150px;
  }

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
    padding: 4px;
    text-align: center;
    box-sizing: border-box;
    @media (max-width: 600px) {
      width: 160px;
    }
  }
}

.rm-pagination-container {
  height: 150px;
  padding: 30px 0;
  width: 100%;

  .rm-pagination {
    .q-btn {
      padding: 10px 10px !important;
    }
  }
}
</style>
