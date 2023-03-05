<template>
  <div>
    <q-card class="my-card rm-card-character" @click="toDetails(character.id)">
      <q-img :class="vefifyStatus(character.status)" :src="character.image">
        <div class="absolute-bottom">
          <div class="name">{{ character.name }}</div>
          <div class="status">Status: {{ character.status }}</div>
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script>
import router from '@/router';
import { useStore } from 'vuex';

export default {
  name: 'CharacterCard',
  props: {
    character: { type: Object, required: true },
  },
  setup() {
    const store = useStore();
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
      vefifyStatus,
      toDetails,
    };
  },
};
</script>

<style lang="scss" scoped>
.rm-card-character {
  position: relative;
  width: 225px;
  margin: 30px auto;
  border-width: 4px;
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
  background-clip: padding-box;
  transition: 0.3s;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 150px;
  }

  &:hover {
    transform: rotate(5deg);
  }

  img {
    border-radius: 50% 10% / 20% 60%;
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
</style>
