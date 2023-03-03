<template>
  <div style="padding: 20px 30px">
    <div v-for="character in requestChar" :key="character.id">
      <div class="row q-col-gutter-md">
        <div class="col-2">
          <q-card class="my-card">
            <q-img :src="character.image">
              <div class="absolute-bottom text-subtitle2 text-center">
                {{ character.name }}
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-5">
          <q-card class="my-card">
            <q-card-section>
              {{ character.name }}
              {{ character.status }}
              {{ character.species }}
              {{ character.type }}
              {{ character.gender }}
              {{ character.origin }}
            </q-card-section>
          </q-card>
        </div>
        <div class="col-5">
          <q-card class="my-card">
            <q-card-section>
              <p v-for="location in character.location" :key="location.id">
                {{ location.name }}
              </p>
              {{ character.location }}
            </q-card-section>
          </q-card>
        </div>
      </div>
      {{ character }}
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRaw } from 'vue';
import { GraphQLClient, gql } from 'graphql-request';
import router from '@/router';
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
      image
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
  setup() {
    const { characterId } = router.currentRoute._value.params;
    const requestChar = reactive({
      character: {},
    });

    const getCharacterById = async (id) => {
      const endpoint = 'https://rickandmortyapi.com/graphql';
      const graphQLClient = new GraphQLClient(endpoint, {
        headers: {},
      });
      const { character } = await graphQLClient.request(requestCharacterById, {
        id,
      });
      requestChar.character = character;
    };

    onMounted(async () => {
      getCharacterById(characterId);
    });

    const toRawContent = (content) => {
      console.log(toRaw(content));
      return toRaw(content);
    };

    return {
      requestChar,
      getCharacterById,
      toRawContent,
    };
  },
};
</script>

<style></style>
