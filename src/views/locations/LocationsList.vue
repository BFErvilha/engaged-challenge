<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <h2 class="rm-card-title">Locais:</h2>
    </div>
    <div class="col-md-6">
      <p class="ep-list-text">
        Existem &nbsp;
        <span>{{ list.locations.length }} &nbsp; </span> locais
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
    <div class="col-12" style="margin-top: 10px">
      <Loading class="col-12" v-if="isLoading" />
      <q-card v-else class="my-card rm-card-character rm-card-shadow">
        <q-list dense separator>
          <q-item
            :clickable="false"
            v-ripple
            v-for="location in list.locations"
            :key="location.id"
          >
            <q-item-section>
              <div class="row justify-content-between location-item">
                <div class="col-6 col-lg-3 p-10">
                  <p class="name">
                    Nome: <br />
                    <span>{{ location.name }}</span>
                  </p>
                </div>
                <div class="col-6 col-lg-3 p-10">
                  <p class="name">
                    Tipo: <br />
                    <span>{{ location.type }}</span>
                  </p>
                </div>
                <div class="col-6 col-lg-2 p-10">
                  <p class="air-date">
                    Dimensão: <br />
                    <span>{{ location.dimension }}</span>
                  </p>
                </div>
                <div class="col-6 col-lg-2 p-10">
                  <p class="air-date">
                    Total Habitantes: <br />
                    <span>{{ location.residents.length }}</span>
                  </p>
                </div>
                <div class="col-11 col-lg-1 p-10">
                  <q-btn
                    class="rm-btn"
                    @click="toDetails(location.id)"
                    style="margin-top: 10px"
                    flat
                    >Detalhes
                  </q-btn>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
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
  query ($page: Int!, $nameFilter: String, $dimensionFilter: String) {
    locations(
      page: $page
      filter: { name: $nameFilter, dimension: $dimensionFilter }
    ) {
      info {
        pages
      }
      results {
        id
        name
        dimension
        type
        residents {
          id
        }
      }
    }
  }
`;
export default {
  // eslint-disable-next-line
  name: 'Locations',
  components: {
    Loading,
  },
  setup() {
    const list = reactive({
      locations: null,
      page: 1,
      name: '',
      dimension: '',
      totalPages: 0,
    });

    const currentPage = ref(1);
    const filterLocation = ref('');
    const filterDimension = ref('');

    const isLoading = ref(true);
    const store = useStore();
    const listRequest = new GraphQLClient(store.getters.graphqlUrl);

    const loadLocations = async (page, name, dimension) => {
      const filter = {
        page,
        name,
        dimension,
      };

      const data = await listRequest.request(query, filter);

      return data.locations;
    };

    const loadingLocationsPage = async () => {
      isLoading.value = true;

      list.page = currentPage.value;
      list.name = filterLocation.value;
      list.dimension = filterDimension.value;

      const result = await loadLocations(list.page, list.name, list.dimension);

      list.locations = result.results;
      list.totalPages = result.info.pages;
      isLoading.value = false;
    };

    loadingLocationsPage();

    watch([currentPage, filterLocation, filterDimension], () => {
      loadingLocationsPage();
    });

    const toDetails = (id) => {
      router.push({ name: 'Location', params: { locationId: id } });
    };

    return {
      list,
      currentPage,
      isLoading,
      toDetails,
    };
  },
};
</script>

<style lang="scss" scoped>
.location-item {
  .name {
    font-size: 14px;
    margin-bottom: 0px !important;
    span {
      font-size: 18px;
    }
  }
  .air-date {
    font-size: 14px;
    margin-bottom: 0px !important;
    span {
      font-size: 18px;
    }
  }
}
</style>
