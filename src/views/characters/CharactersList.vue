<template>
  <div class="row q-col-gutter-md">
    <div
      class="col-md-3"
      v-for="character in characters.characters"
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
          <q-btn class="rm-btn" flat>Detalhes</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script>
import { gql } from 'graphql-tag';
import { reactive, onMounted } from 'vue';

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

    onMounted(async () => {
      const response = await fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.loc.source.body }),
      });

      const { data } = await response.json();
      characters.characters = data.characters.results;
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

    return {
      characters,
      vefifyStatus,
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
