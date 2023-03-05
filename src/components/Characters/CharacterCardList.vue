<template>
  <q-card class="my-card rm-card-character rm-card-shadow">
    <q-card-section>
      <div class="row q-col-gutter-md justify-content-arround">
        <div class="col-md-12 flex flex-end">
          <q-pagination
            class="rm-pagination"
            v-model="currentPage"
            color="teal"
            :max="totalPages"
            :max-pages="totalPages"
            input
            input-class="text-light-green"
          />
        </div>
        <div
          class="col-12 col-md-4 col-lg-3"
          v-for="character in paginatedCharacters"
          :key="character.id"
        >
          <CharacterCard :character="character" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { ref, computed } from 'vue';
import CharacterCard from '@/components/Characters/CharacterCard.vue';
export default {
  name: 'CharacterCardList',
  props: {
    characters: { type: Object, required: true },
  },
  components: {
    CharacterCard,
  },
  setup(props) {
    const currentPage = ref(1);
    const perPage = ref(12);
    const totalPages = computed(() =>
      Math.ceil(props.characters.length / perPage.value),
    );

    const paginatedCharacters = computed(() => {
      const startIndex = (currentPage.value - 1) * perPage.value;
      const endIndex = startIndex + perPage.value;
      return props.characters.slice(startIndex, endIndex);
    });

    return {
      paginatedCharacters,
      currentPage,
      totalPages,
    };
  },
};
</script>

<style></style>
