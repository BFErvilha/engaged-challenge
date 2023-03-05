<template>
  <q-card class="my-card rm-card-character rm-card-shadow">
    <q-card-section>
      <div class="row q-col-gutter-md justify-content-between">
        <div class="col-12">
          <h2 class="rm-card-title">Habitantes:</h2>
        </div>
        <div class="col-md-6">
          <p class="ep-list-text">
            Existem &nbsp;
            <span>{{ residents.length }} &nbsp; </span> habitantes
          </p>
        </div>
        <div class="col-md-6 flex flex-end">
          <q-pagination
            class="rm-pagination"
            v-model="currentRdPage"
            color="teal"
            :max="totalRdPages"
            :max-pages="totalRdPages"
            input
            input-class="text-light-green"
          />
        </div>
        <div class="col-12">
          <ResidentList :residentList="paginatedResidents" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, computed } from 'vue';
import ResidentList from '@/views/characters/character/ResidentList.vue';
export default {
  // eslint-disable-next-line
  name: 'Residents',
  components: {
    ResidentList,
  },
  props: {
    residents: { type: Object, required: true },
  },
  setup(props) {
    const currentRdPage = ref(1);
    const rdPerPage = ref(20);
    const totalRdPages = computed(() =>
      Math.ceil(props.residents.length / rdPerPage.value),
    );

    const paginatedResidents = computed(() => {
      const startIndex = (currentRdPage.value - 1) * rdPerPage.value;
      const endIndex = startIndex + rdPerPage.value;
      return props.residents.slice(startIndex, endIndex);
    });

    return {
      paginatedResidents,
      currentRdPage,
      totalRdPages,
    };
  },
};
</script>

<style></style>
