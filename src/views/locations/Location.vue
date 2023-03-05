<template>
  <div>
    <Loading v-if="isLoading" />
    <div v-else class="row justify-content-between">
      <div class="col-12" style="margin-bottom: 20px">
        <h2 class="rm-card-title">Local:</h2>
      </div>
      <div class="col-12">
        <q-card class="my-card rm-card-character rm-card-shadow">
          <q-card-section>
            <div class="row justify-content-between">
              <div class="col-4">
                <p class="info">
                  Nome: <br /><span>{{ local.info.name }}</span>
                </p>
              </div>
              <div class="col-4">
                <p class="info">
                  Tipo: <br /><span> {{ local.info.type }}</span>
                </p>
              </div>
              <div class="col-4">
                <p class="info">
                  Dimensão:<br /><span> {{ local.info.dimension }}</span>
                </p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12" style="margin-top: 30px">
        <h2 class="rm-card-title">Habitantes:</h2>
      </div>
      <div class="col-12">
        <ChractecterCardList :characters="local.residents" />
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

const requestLocationById = gql`
  query getLocationById($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
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
  name: 'Location',
  components: {
    ChractecterCardList,
    Loading,
  },
  setup() {
    const store = useStore();
    const { locationId } = router.currentRoute._value.params;
    const locationInfo = reactive({
      location: null,
    });

    const local = reactive({
      info: null,
      residents: null,
    });

    const isLoading = ref(true);
    const graphqlLink = store.getters.graphqlUrl;
    const listRequest = new GraphQLClient(graphqlLink);

    const loadLocation = async (id) => {
      const filter = {
        id,
      };
      const data = await listRequest.request(requestLocationById, filter);
      return data.location;
    };

    const loadingLocation = async () => {
      isLoading.value = true;

      const result = await loadLocation(locationId);
      locationInfo.location = result;
      refineRsults(locationInfo);
      isLoading.value = false;
    };

    const refineRsults = (data) => {
      local.info = {
        name: data.location.name,
        dimension: data.location.dimension,
        type: data.location.type,
      };
      local.residents = data.location.residents;
    };
    onMounted(async () => {
      loadingLocation();
    });

    return {
      local,
      isLoading,
    };
  },
};
</script>

<style></style>
